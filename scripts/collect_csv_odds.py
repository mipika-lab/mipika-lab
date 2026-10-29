
import csv
import io
import time
import urllib.request
import urllib.error
from datetime import date, timedelta
from pathlib import Path

START_DATE = date(2026, 1, 1)
END_DATE = date(2026, 10, 30)

BASE_URL = "https://boatracecsv.github.io/data/previews/od3"
OUTPUT_DIR = Path("data/csv_odds")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def collect(day):
    relative = day.strftime("%Y/%m/%d.csv")
    url = f"{BASE_URL}/{relative}"
    output = OUTPUT_DIR / day.strftime("%Y%m%d.csv")

    if output.exists() and output.stat().st_size > 0:
        print(f"SKIP {day}")
        return "skipped"

    request = urllib.request.Request(
        url,
        headers={"User-Agent": "MipikaLabOddsCollector/1.0"}
    )

    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            raw = response.read()

        if not raw:
            raise ValueError("Empty CSV")

        text = raw.decode("utf-8-sig")
        rows = list(csv.reader(io.StringIO(text)))

        if len(rows) < 2:
            raise ValueError("CSV has insufficient rows")

        output.write_bytes(raw)
        print(f"OK {day}: {len(rows)} rows")
        return "success"

    except urllib.error.HTTPError as error:
        print(f"HTTP {day}: {error.code}")
    except (
        urllib.error.URLError,
        TimeoutError,
        UnicodeError,
        ValueError,
        OSError
    ) as error:
        print(f"ERROR {day}: {error}")

    return "failed"


def main():
    counts = {
        "success": 0,
        "skipped": 0,
        "failed": 0
    }

    day = START_DATE

    while day <= END_DATE:
        result = collect(day)
        counts[result] += 1

        if result != "skipped":
            time.sleep(1)

        day += timedelta(days=1)

    print("----- FINISHED -----")
    print(f"Downloaded: {counts['success']}")
    print(f"Skipped: {counts['skipped']}")
    print(f"Failed: {counts['failed']}")


if __name__ == "__main__":
    main()
