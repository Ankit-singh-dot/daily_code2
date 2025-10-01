import requests
import concurrent.futures
import time
import random
import csv
import json
from tqdm import tqdm

# Constants
RETRIES = 3
TIMEOUT = 30
URL = "https://complyrelax.com/Dashboard-CS/dininformation.php"

HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded"
}

MISSING_FILE = "missing_dins.csv"  # where missing DINs will be saved

def fetch_din(din):
    din_str = str(din).zfill(8)

    for attempt in range(RETRIES):
        try:
            resp = requests.post(
                URL,
                data={"din": din_str},
                headers=HEADERS,
                timeout=TIMEOUT
            )
            resp.raise_for_status()
            text = resp.text.strip()

            # check if it's the "No Matching Record Found" response
            try:
                data = json.loads(text)
                if data.get("error") == "No Rows":
                    return din, "NOT_FOUND"
            except:
                pass

            return din, text if text else "EMPTY"

        except requests.exceptions.Timeout:
            wait = 2 ** attempt + random.uniform(0, 1)
            print(f"⏳ Timeout DIN {din_str}, retry {attempt+1}/{RETRIES} in {wait:.1f}s...")
            time.sleep(wait)

        except requests.exceptions.RequestException as e:
            return din, f"ERROR: {str(e)}"

    return din, "FAILED"


def process_chunk(chunk, output_file, write_header=False, max_workers=10):
    results = {}
    missing = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(fetch_din, din): din for din in chunk}

        for future in tqdm(concurrent.futures.as_completed(futures),
                           total=len(chunk), desc=f"Processing DINs {chunk[0]} - {chunk[-1]}"):
            try:
                din, result = future.result()
                if result == "NOT_FOUND":
                    missing.append(din)
                else:
                    results[din] = result
            except Exception as e:
                results[din] = f"UNCAUGHT ERROR: {str(e)}"

    # Append valid results to main CSV
    with open(output_file, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if write_header:
            writer.writerow(["DIN", "Response"])
        for din in sorted(results.keys()):
            writer.writerow([str(din).zfill(8), results[din]])

    # Append missing DINs separately
    if missing:
        with open(MISSING_FILE, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            for din in sorted(missing):
                writer.writerow([str(din).zfill(8)])


def run_scraper(start, end, output_file="din_5359873,6000000.csv", chunk_size=300, max_workers=10):
    # Clean CSV files before starting
    open(output_file, "w").close()
    open(MISSING_FILE, "w").close()

    all_dins = list(range(start, end))
    chunks = [all_dins[i:i + chunk_size] for i in range(0, len(all_dins), chunk_size)]

    for i, chunk in enumerate(chunks):
        process_chunk(chunk, output_file, write_header=(i == 0), max_workers=max_workers)


if __name__ == "__main__":
    run_scraper( 5359873,6000000, max_workers=10)