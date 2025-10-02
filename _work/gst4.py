import requests
import time
from bs4 import BeautifulSoup
import csv
import string
import re

# CONFIG
BASE_PAGE = "https://my.gstzen.in/p/gstin-validator/home/free"
POST_URL = "https://my.gstzen.in/p/gstin-validator/home/"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"

def get_csrf_token(session):
    """Get CSRF token from the page."""
    try:
        resp = session.get(BASE_PAGE, timeout=20)
        print(f"Initial GET status: {resp.status_code}")
        
        # Try to get CSRF from cookies first
        csrf_cookie = session.cookies.get('csrftoken')
        if csrf_cookie:
            print(f"Found CSRF in cookie: {csrf_cookie[:20]}...")
            return csrf_cookie
        
        # Parse from HTML
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # Look for meta tag
        meta = soup.find('meta', attrs={'name': 'csrf-token'})
        if meta and meta.get('content'):
            token = meta['content']
            print(f"Found CSRF in meta tag: {token[:20]}...")
            return token
        
        # Look for hidden input
        inp = soup.find('input', attrs={'name': 'csrfmiddlewaretoken'})
        if inp and inp.get('value'):
            token = inp['value']
            print(f"Found CSRF in hidden input: {token[:20]}...")
            return token
        
        # Try to find any token-like string in page
        csrf_pattern = r'csrfToken["\']:\s*["\']([^"\']+)["\']'
        match = re.search(csrf_pattern, resp.text)
        if match:
            token = match.group(1)
            print(f"Found CSRF in JS: {token[:20]}...")
            return token
        
        print("Warning: No CSRF token found")
        return None
        
    except Exception as e:
        print(f"Error getting CSRF: {e}")
        return None

def prepare_session():
    """Initialize session with proper headers and cookies."""
    s = requests.Session()
    
    # Set up headers to match the working curl
    s.headers.update({
        'User-Agent': USER_AGENT,
        'Accept': '*/*',
        'Accept-Language': 'en-IN,en;q=0.9,hi;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': BASE_PAGE,
        'Origin': 'https://my.gstzen.in',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
    })
    
    # Get CSRF token
    csrf = get_csrf_token(s)
    
    return s, csrf

def calculate_gstin_checksum(gstin_without_checksum):
    """Calculate GSTIN checksum (15th character) using Luhn algorithm variant."""
    char_map = {str(i): i for i in range(10)}
    for i, c in enumerate(string.ascii_uppercase):
        char_map[c] = 10 + i
    
    num_to_char = {v: k for k, v in char_map.items()}
    
    factor = 2
    total = 0
    
    for char in reversed(gstin_without_checksum):
        digit = char_map.get(char.upper(), 0)
        addend = factor * digit
        factor = 1 if factor == 2 else 2
        addend = (addend // 36) + (addend % 36)
        total += addend
    
    checksum_val = (36 - (total % 36)) % 36
    return num_to_char.get(checksum_val, '0')

def generate_gstin_combinations(state_code="29", first_3_chars="AAA", 
                                 start_num=1000, limit=100, entity_number="1"):
    """
    Generate GSTIN combinations for Karnataka Firms.
    
    GSTIN Format: 29 + AAAFXXXXX + A + 1 + Z + CHECKSUM
    - 29: Karnataka state code
    - AAA: First 3 characters of PAN (configurable)
    - F: 4th character = Firm entity type
    - XXXXX: 5-digit number (we'll iterate this)
    - A: 10th character = PAN checksum (usually alphabetic)
    - 1: Entity number (registration sequence in state)
    - Z: Fixed character (14th position)
    - CHECKSUM: Calculated 15th character
    """
    gstins = []
    
    print(f"Generating GSTINs for Karnataka (29) FIRMS (F) with pattern: {first_3_chars}F[XXXXX]A...")
    
    for num in range(start_num, start_num + limit):
        num_str = str(num).zfill(5)
        pan = f"{first_3_chars}F{num_str}A"
        gstin_partial = f"{state_code}{pan}{entity_number}Z"
        checksum = calculate_gstin_checksum(gstin_partial)
        gstin = gstin_partial + checksum
        gstins.append(gstin)
    
    return gstins

def validate_gstin(session, csrf_token, gstin):
    """Validate a single GSTIN and get legal name."""
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrf_token,
    }
    
    data = {
        'action': 'validate',
        'text': gstin,
        'validator': 'free'
    }
    
    try:
        response = session.post(POST_URL, data=data, headers=headers, timeout=20)
        
        if response.status_code == 200:
            try:
                json_data = response.json()
                return json_data
            except:
                print(f"    Failed to parse JSON: {response.text[:200]}")
                return None
        else:
            print(f"    HTTP Error {response.status_code}")
            return None
            
    except Exception as e:
        print(f"    Request error: {e}")
        return None

def validate_batch(session, csrf_token, gstins):
    """Validate a batch of GSTINs and categorize them."""
    valid_results = []
    invalid_results = []
    
    for idx, gstin in enumerate(gstins, 1):
        print(f"\n[{idx}/{len(gstins)}] Validating: {gstin}")
        
        result = validate_gstin(session, csrf_token, gstin)
        
        if result and result.get('status') == 'success':
            results_list = result.get('results', [])
            
            if results_list and len(results_list) > 0:
                item = results_list[0]
                is_valid = item.get('valid', False)
                legal_name = item.get('legal_name', '')
                
                if is_valid:
                    print(f"  ✓ VALID: {gstin}")
                    if legal_name:
                        print(f"    Legal Name: {legal_name}")
                    else:
                        print(f"    Legal Name: (not available)")
                    
                    valid_results.append({
                        'gstin': gstin,
                        'legal_name': legal_name,
                        'valid': True,
                        'full_response': result
                    })
                else:
                    print(f"  ✗ INVALID: {gstin}")
                    invalid_results.append({
                        'gstin': gstin,
                        'reason': 'invalid_format',
                        'full_response': result
                    })
            else:
                print(f"  ✗ NO RESULTS: {gstin}")
                invalid_results.append({
                    'gstin': gstin,
                    'reason': 'no_results',
                    'full_response': result
                })
        else:
            print(f"  ✗ ERROR: {gstin}")
            error_msg = result.get('message', 'Unknown error') if result else 'Request failed'
            invalid_results.append({
                'gstin': gstin,
                'reason': error_msg,
                'full_response': result
            })
        
        # Rate limiting - be respectful to the API
        time.sleep(0.5)
    
    return valid_results, invalid_results

def save_results(valid_results, invalid_results):
    """Save valid and invalid results to separate CSV files."""
    
    # Save valid GSTINs with legal names
    with open("valid_gstins.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["GSTIN", "Legal Name", "Valid", "Full Response"])
        for r in valid_results:
            writer.writerow([
                r['gstin'],
                r['legal_name'],
                r['valid'],
                str(r['full_response'])
            ])
    
    # Save invalid GSTINs
    with open("invalid_gstins.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["GSTIN", "Reason", "Full Response"])
        for r in invalid_results:
            writer.writerow([
                r['gstin'],
                r['reason'],
                str(r.get('full_response', ''))
            ])
    
    print(f"\n{'='*70}")
    print(f"✓ RESULTS SAVED:")
    print(f"  Valid GSTINs:   {len(valid_results):>4} → valid_gstins.csv")
    print(f"  Invalid GSTINs: {len(invalid_results):>4} → invalid_gstins.csv")
    
    # Summary of valid results with legal names
    valid_with_names = [r for r in valid_results if r['legal_name']]
    print(f"\n  GSTINs with Legal Names: {len(valid_with_names)}/{len(valid_results)}")
    print(f"{'='*70}")

def main():
    print("="*70)
    print("GSTIN Validator - Karnataka Firms (Entity Type: F)")
    print("="*70)
    
    # Configuration
    STATE_CODE = "29"          # Karnataka
    FIRST_3_CHARS = "AAC"      # First 3 chars of PAN (change as needed)
    START_NUMBER = 10000       # Starting 5-digit number for iteration
    LIMIT = 50                 # Number of GSTINs to generate and test
    ENTITY_NUMBER = "1"        # Usually "1" for first registration
    
    print(f"\nConfiguration:")
    print(f"  State: {STATE_CODE} (Karnataka)")
    print(f"  Entity Type: F (Firm)")
    print(f"  PAN Pattern: {FIRST_3_CHARS}F[XXXXX]A")
    print(f"  Range: {START_NUMBER} to {START_NUMBER + LIMIT - 1}")
    print(f"  Entity Number: {ENTITY_NUMBER}")
    print()
    
    # Generate GSTIN combinations
    gstins = generate_gstin_combinations(
        state_code=STATE_CODE,
        first_3_chars=FIRST_3_CHARS,
        start_num=START_NUMBER,
        limit=LIMIT,
        entity_number=ENTITY_NUMBER
    )
    
    print(f"\n✓ Generated {len(gstins)} GSTINs to validate")
    print(f"  Sample: {gstins[0]}, {gstins[1]}, ...\n")
    
    # Initialize session
    print("Initializing session...")
    session, csrf = prepare_session()
    
    if not csrf:
        print("WARNING: Could not get CSRF token. Attempting without it...")
    
    time.sleep(1)
    
    # Validate batch
    print(f"\nStarting validation...")
    print(f"{'='*70}")
    
    valid_results, invalid_results = validate_batch(session, csrf, gstins)
    
    # Save results
    save_results(valid_results, invalid_results)
    
    # Print sample of results
    if valid_results:
        print(f"\n📋 Sample Valid Results:")
        for r in valid_results[:5]:
            print(f"  {r['gstin']} → {r['legal_name'] or '(no name)'}")

if __name__ == "__main__":
    main()