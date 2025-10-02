import requests
import time
from bs4 import BeautifulSoup
import csv
import string
import itertools

# CONFIG
BASE_PAGE = "https://my.gstzen.in/p/gstin-validator/home/free"
POST_URL = "https://my.gstzen.in/p/gstin-validator/home/"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
HEADERS_BASE = {
    "User-Agent": USER_AGENT,
    "Accept": "*/*",
    "Referer": BASE_PAGE,
    "Origin": "https://my.gstzen.in",
    "Content-Type": "application/x-www-form-urlencoded",
}

def get_csrf_from_html(html_text):
    """Extract CSRF token from HTML."""
    soup = BeautifulSoup(html_text, "html.parser")
    meta = soup.find("meta", attrs={"name": "csrf-token"}) or soup.find("meta", attrs={"name": "csrfmiddlewaretoken"})
    if meta and meta.get("content"):
        return meta["content"]
    inp = soup.find("input", attrs={"name": "csrfmiddlewaretoken"}) or soup.find("input", attrs={"name": "csrftoken"})
    if inp and inp.get("value"):
        return inp["value"]
    for i in soup.find_all("input", type="hidden"):
        val = i.get("value", "")
        if val and len(val) > 10 and all(c.isalnum() or c in "-_" for c in val):
            return val
    return None

def prepare_session():
    """Initialize session with CSRF token."""
    s = requests.Session()
    s.headers.update(HEADERS_BASE)
    resp = s.get(BASE_PAGE, timeout=20)
    print("Initial GET status:", resp.status_code)
    
    cookie_csrf = s.cookies.get("csrftoken") or s.cookies.get("csrf")
    if cookie_csrf:
        print("Found CSRF in cookies:", cookie_csrf)
        return s, cookie_csrf

    html_token = get_csrf_from_html(resp.text)
    if html_token:
        print("Found CSRF in HTML:", html_token)
        s.cookies.set("csrftoken", html_token, domain="my.gstzen.in")
        return s, html_token

    print("No CSRF token found.")
    return s, None

def post_validate(session, csrf_token, gstin):
    """Validate a single GSTIN."""
    headers = {}
    headers.update(HEADERS_BASE)
    if csrf_token:
        headers["x-csrftoken"] = csrf_token
        headers["X-CSRFToken"] = csrf_token
    
    data = {"action": "validate", "text": gstin, "validator": "free"}
    try:
        r = session.post(POST_URL, data=data, headers=headers, timeout=20)
        return r.status_code, r.text, r
    except Exception as e:
        return None, f"ERROR:{e}", None

def generate_gstin_combinations(state_code="29", entity_type="F", base_pan_start="AAA", 
                                 entity_number="1", checksum="W", limit=100):
    """
    Generate GSTIN combinations based on pattern:
    STATE(2) + PAN(10) + ENTITY(1) + Z + CHECKSUM(1)
    
    GSTIN Format: 29AAAFP1234F1ZW
    - 29: Karnataka state code
    - AAAFP1234F: PAN (10 chars) - F in 4th position for Firm
    - 1: Entity number
    - Z: Fixed character
    - W: Checksum
    
    For iteration, we'll vary the numeric part of PAN (positions 5-8)
    """
    gstins = []
    
    # Entity type codes:
    # C = Company, P = Private Ltd, F = Firm, H = HUF, etc.
    
    # PAN structure for Firm: AAAFPXXXXF
    # 4th char = F for Firm, 10th char = F for Firm
    
    # Iterate through different combinations
    for num in range(1000, 1000 + limit):  # 4-digit numbers from PAN
        num_str = str(num)
        pan = f"{base_pan_start}FP{num_str}F"  # F for Firm
        gstin = f"{state_code}{pan}{entity_number}Z{checksum}"
        gstins.append(gstin)
    
    return gstins

def validate_batch(session, csrf_token, gstins):
    """Validate a batch of GSTINs and categorize them."""
    valid_results = []
    invalid_results = []
    
    for idx, gstin in enumerate(gstins, 1):
        print(f"[{idx}/{len(gstins)}] Validating: {gstin}")
        
        status, body, response = post_validate(session, csrf_token, gstin)
        
        if status == 200:
            try:
                json_data = response.json()
                is_valid = json_data.get('valid', False) or json_data.get('status') == 'valid'
                
                if is_valid:
                    print(f"  ✓ VALID: {gstin}")
                    valid_results.append({
                        'gstin': gstin,
                        'status': 'valid',
                        'response': json_data
                    })
                else:
                    print(f"  ✗ INVALID: {gstin}")
                    invalid_results.append({
                        'gstin': gstin,
                        'status': 'invalid',
                        'response': json_data
                    })
            except Exception as e:
                print(f"  ? PARSE ERROR: {gstin} - {e}")
                invalid_results.append({
                    'gstin': gstin,
                    'status': 'error',
                    'response': body[:500]
                })
        else:
            print(f"  ✗ HTTP ERROR {status}: {gstin}")
            invalid_results.append({
                'gstin': gstin,
                'status': f'http_error_{status}',
                'response': body[:500]
            })
        
        # Rate limiting
        time.sleep(0.5)  # Adjust delay as needed
    
    return valid_results, invalid_results

def save_results(valid_results, invalid_results):
    """Save valid and invalid results to separate CSV files."""
    # Save valid GSTINs
    with open("valid_gstins.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["GSTIN", "Status", "Response"])
        for r in valid_results:
            writer.writerow([r['gstin'], r['status'], str(r['response'])])
    
    # Save invalid GSTINs
    with open("invalid_gstins.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["GSTIN", "Status", "Response"])
        for r in invalid_results:
            writer.writerow([r['gstin'], r['status'], str(r['response'])])
    
    print(f"\n✓ Results saved:")
    print(f"  - Valid GSTINs: {len(valid_results)} → valid_gstins.csv")
    print(f"  - Invalid GSTINs: {len(invalid_results)} → invalid_gstins.csv")

def main():
    # Generate GSTIN combinations
    # For Karnataka (29) + Firm entity type (F)
    print("Generating GSTIN combinations...")
    gstins = generate_gstin_combinations(
        state_code="29",      # Karnataka
        entity_type="F",      # Firm
        base_pan_start="AAA", # Starting letters of PAN
        entity_number="1",    # Entity number
        checksum="W",         # Checksum (you may need to calculate this properly)
        limit=10              # Number of combinations to try
    )
    
    print(f"Generated {len(gstins)} GSTINs to validate\n")
    
    # Initialize session
    session, csrf = prepare_session()
    time.sleep(0.5)
    
    # Validate batch
    valid_results, invalid_results = validate_batch(session, csrf, gstins)
    
    # Save results
    save_results(valid_results, invalid_results)

if __name__ == "__main__":
    main()