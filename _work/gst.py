# gstin_legal_names.py
"""
Usage:
  1) Put GSTINs in `input.csv` (one per line or in first column).
  2) Edit HEADERS/COOKIES if the site requires CSRF or cookies (use your legit values).
  3) Run: python gstin_legal_names.py
  4) Output: results.csv
"""

import csv
import time
import requests
from typing import Optional

# --------------------------
# GSTIN checksum utils (same as earlier)
# --------------------------
CHAR_MAP = {str(i): i for i in range(10)}
CHAR_MAP.update({chr(ord('A') + i): 10 + i for i in range(26)})
REVERSE_MAP = {v: k for k, v in CHAR_MAP.items()}
WEIGHTS = [1, 3, 7]  # cyclic weights

def char_value(ch: str) -> int:
    ch = ch.upper()
    if ch in CHAR_MAP:
        return CHAR_MAP[ch]
    raise ValueError(f"Invalid character for GSTIN: {ch}")

def compute_check_char(prefix14: str) -> str:
    if len(prefix14) != 14:
        raise ValueError("prefix14 must be 14 characters")
    total = 0
    for i, ch in enumerate(prefix14):
        v = char_value(ch)
        w = WEIGHTS[i % len(WEIGHTS)]
        total += v * w
    remainder = total % 36
    checksum_code = (36 - remainder) % 36
    return REVERSE_MAP[checksum_code]

def is_valid_gstin(gstin: str) -> bool:
    gstin = gstin.strip().upper()
    if len(gstin) != 15:
        return False
    prefix = gstin[:14]
    try:
        expected = compute_check_char(prefix)
    except Exception:
        return False
    return gstin[-1] == expected

# --------------------------
# Network / query logic
# --------------------------
URL = "https://my.gstzen.in/p/gstin-validator/home/"
HEADERS = {
    "accept": "*/*",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://my.gstzen.in",
    "referer": "https://my.gstzen.in/p/gstin-validator/home/free",
    # Put a polite user agent
    "user-agent": "gstin-checker/1.0 (+your-email@example.com)",
    # "x-csrftoken": "PUT_YOUR_TOKEN_HERE",  # uncomment + set if required
}
# If the site requires cookies (csrf token, session), set them here legitimately.
COOKIES = {
    # "csrftoken": "MVn8c9hUQTAxYpVX8FgjE3sDYWyIpiEV",
    # ... add cookies if needed
}

DELAY_SECONDS = 1.2  # pause between requests (increase if you run a lot)
MAX_RETRIES = 2
TIMEOUT = 15

def query_validator(session: requests.Session, gstin: str) -> tuple:
    payload = {"action": "validate", "text": gstin, "validator": "free"}
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.post(URL, data=payload, timeout=TIMEOUT)
            # try parse json if possible
            try:
                j = resp.json()
            except ValueError:
                j = None
            return resp.status_code, j, resp.text
        except Exception as e:
            print(f"Warning: request failed for {gstin} (attempt {attempt}): {e}")
            time.sleep(1.0 * attempt)
    return None, None, f"ERROR: max retries exceeded"

# --------------------------
# Main: read input, process, write output
# --------------------------
def main(in_file="input.csv", out_file="results.csv"):
    session = requests.Session()
    session.headers.update(HEADERS)
    # attach cookies if provided
    if COOKIES:
        session.cookies.update(COOKIES)

    with open(in_file, newline="", encoding="utf-8") as f_in, \
         open(out_file, "w", newline="", encoding="utf-8") as f_out:
        reader = csv.reader(f_in)
        writer = csv.writer(f_out)
        writer.writerow(["gstin", "structurally_valid", "http_status", "valid", "legal_name", "response_snippet"])

        row_count = 0
        for row in reader:
            if not row:
                continue
            row_count += 1
            gstin_raw = row[0].strip()
            if not gstin_raw:
                continue
            gstin = gstin_raw.upper()
            structurally_valid = is_valid_gstin(gstin)
            if not structurally_valid:
                writer.writerow([gstin, "no", "", "", "", "invalid checksum/format"])
                print(f"[{row_count}] Skipped invalid GSTIN: {gstin}")
                continue

            print(f"[{row_count}] Querying: {gstin}")
            status, json_body, text_body = query_validator(session, gstin)
            snippet = (str(json_body) if json_body is not None else (text_body or ""))[:800].replace("\n", " ")
            # Expected response structure based on your example:
            # maybe an array like [{ input: "...", valid: true, legal_name: "..." }, ...]
            valid_flag = ""
            legal_name = ""
            try:
                if isinstance(json_body, list) and len(json_body) > 0 and isinstance(json_body[0], dict):
                    item = json_body[0]
                    valid_flag = item.get("valid", "")
                    legal_name = item.get("legal_name", "")
                elif isinstance(json_body, dict):
                    # sometimes the API returns directly a dict or nested field
                    # attempt common shapes:
                    if "valid" in json_body:
                        valid_flag = json_body.get("valid", "")
                        legal_name = json_body.get("legal_name", "")
                    else:
                        # try to find the first object with valid key
                        if "data" in json_body and isinstance(json_body["data"], list) and json_body["data"]:
                            item = json_body["data"][0]
                            valid_flag = item.get("valid", "")
                            legal_name = item.get("legal_name", "")
                # normalize valid_flag to string
                valid_flag = str(valid_flag)
            except Exception as e:
                snippet = f"PARSE_ERROR: {e} | {snippet}"
            writer.writerow([gstin, "yes", status, valid_flag, legal_name, snippet])
            # polite pause
            time.sleep(DELAY_SECONDS)

    print("Done. Results saved to", out_file)

if __name__ == "__main__":
    main()
