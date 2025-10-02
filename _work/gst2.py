import requests
import time
from bs4 import BeautifulSoup  # pip install beautifulsoup4
import csv

# CONFIG
BASE_PAGE = "https://my.gstzen.in/p/gstin-validator/home/free"  # page where the validator widget lives
POST_URL = "https://my.gstzen.in/p/gstin-validator/home/"       # the POST endpoint you used
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
HEADERS_BASE = {
    "User-Agent": USER_AGENT,
    "Accept": "*/*",
    "Referer": BASE_PAGE,
    "Origin": "https://my.gstzen.in",
    "Content-Type": "application/x-www-form-urlencoded",
}

# Input GSTINs (example small list)
candidates = [ "29AAACT2727Q1ZW", "29AACCW9827A1Z5"]  # replace with your candidate list

def get_csrf_from_html(html_text):
    """Try to extract csrf token from HTML meta or hidden input (common patterns)."""
    soup = BeautifulSoup(html_text, "html.parser")
    # look for meta[name="csrf-token"] or meta[name="csrfmiddlewaretoken"] or input[name="csrfmiddlewaretoken"]
    meta = soup.find("meta", attrs={"name": "csrf-token"}) or soup.find("meta", attrs={"name": "csrfmiddlewaretoken"})
    if meta and meta.get("content"):
        return meta["content"]
    inp = soup.find("input", attrs={"name": "csrfmiddlewaretoken"}) or soup.find("input", attrs={"name": "csrftoken"})
    if inp and inp.get("value"):
        return inp["value"]
    # try finding any token-like hidden input
    for i in soup.find_all("input", type="hidden"):
        val = i.get("value", "")
        if val and len(val) > 10 and all(c.isalnum() or c in "-_" for c in val):
            return val
    return None

def prepare_session():
    s = requests.Session()
    s.headers.update(HEADERS_BASE)
    # initial GET - let server set cookies and maybe anti-bot tokens
    resp = s.get(BASE_PAGE, timeout=20)
    print("Initial GET status:", resp.status_code)
    # extract csrf from cookies first (common in Django sites)
    cookie_csrf = s.cookies.get("csrftoken") or s.cookies.get("csrf")
    if cookie_csrf:
        print("Found csrf in cookies:", cookie_csrf)
        return s, cookie_csrf

    # else try to parse token from html
    html_token = get_csrf_from_html(resp.text)
    if html_token:
        print("Found csrf in HTML:", html_token)
        # some sites want csrftoken as cookie too; set it explicitly in session
        s.cookies.set("csrftoken", html_token, domain="my.gstzen.in")
        return s, html_token

    # If not found, return session and None — POST may still require token
    print("No CSRF token found in cookies or HTML.")
    return s, None

def post_validate(session, csrf_token, gstin):
    headers = {}
    headers.update(HEADERS_BASE)
    if csrf_token:
        headers["x-csrftoken"] = csrf_token
        # some endpoints also need X-CSRFToken (capitalization differs)
        headers["X-CSRFToken"] = csrf_token
    data = {"action": "validate", "text": gstin, "validator": "free"}
    try:
        r = session.post(POST_URL, data=data, headers=headers, timeout=20)
        return r.status_code, r.text
    except Exception as e:
        return None, f"ERROR:{e}"

def main():
    session, csrf = prepare_session()
    # Optional small pause to mimic human browsing
    time.sleep(0.5)

    out_rows = []
    for g in candidates:
        status, body = post_validate(session, csrf, g)
        print("GSTIN", g, "-> status", status)
        if status == 200:
            # try parse JSON
            try:
                j = session.post(POST_URL, data={"action":"validate","text":g,"validator":"free"}).json()
                out_rows.append((g, 200, j))
            except Exception:
                out_rows.append((g, status, body[:800]))
        else:
            out_rows.append((g, status, body[:800]))

        time.sleep(0.4)  # small delay

    # write results
    with open("results_fix.csv", "w", newline="", encoding="utf-8") as f:
        import csv
        w = csv.writer(f)
        w.writerow(["gstin", "http_status", "response_snippet"])
        for r in out_rows:
            w.writerow([r[0], r[1], str(r[2])])

if __name__ == "__main__":
    main()
