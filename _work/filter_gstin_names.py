# filter_gstin_names.py
import csv
import json
from typing import Tuple

INPUT = "results_fix.csv"     # change if needed
OUTPUT = "filtered.csv"

def extract_valid_and_name(response_snippet: str) -> Tuple[str, str]:
    """
    Parse the response_snippet (JSON string) and return (valid, legal_name).
    If parsing fails or keys missing, returns ("", "").
    """
    if not response_snippet:
        return "", ""
    # Sometimes the snippet is already a Python-escaped string with quotes.
    # json.loads should handle strings like '{"status":"success","results":[...]}'
    try:
        data = json.loads(response_snippet)
    except Exception:
        # Try to fix common issues: strip leading/trailing quotes
        s = response_snippet.strip()
        if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
            s = s[1:-1]
        # Unescape escaped quotes
        s = s.replace('\\"', '"').replace("\\'", "'")
        try:
            data = json.loads(s)
        except Exception:
            return "", ""

    # Extract results array
    results = None
    if isinstance(data, dict):
        results = data.get("results") or data.get("data") or []
    elif isinstance(data, list) and data:
        # sometimes the API returns a list directly
        results = data
    else:
        results = []

    if results and isinstance(results, list) and len(results) > 0 and isinstance(results[0], dict):
        item = results[0]
        valid = item.get("valid", "")
        legal_name = item.get("legal_name", "") or item.get("lgnm", "") or ""
        # Normalize booleans to "true"/"false" strings if needed
        if isinstance(valid, bool):
            valid = "true" if valid else "false"
        return str(valid), str(legal_name)
    return "", ""

def main():
    with open(INPUT, newline="", encoding="utf-8") as f_in, \
         open(OUTPUT, "w", newline="", encoding="utf-8") as f_out:
        reader = csv.DictReader(f_in)
        writer = csv.writer(f_out)
        writer.writerow(["gstin", "valid", "legal_name"])

        for row in reader:
            gstin = row.get("gstin") or row.get("input") or ""
            snippet = row.get("response_snippet") or row.get("response") or ""
            valid, name = extract_valid_and_name(snippet)
            writer.writerow([gstin, valid, name])

    print(f"Done — output written to {OUTPUT}")

if __name__ == "__main__":
    main()
