
import json
import time
import urllib.request
import urllib.error
from pathlib import Path
from datetime import date, timedelta

# 取得する期間
START_DATE = date(2026, 1, 1)
END_DATE = date(2026, 10, 30)

# 保存先
OUTPUT_DIR = Path("data") / "historical_odds"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

BASE_URL = "https://lamrongol.github.io/BoatraceOdds/v3"

def dates_between(start, end):
    current = start
    while current <= end:
        yield current
        current += timedelta(days=1)

def download_odds(day):
    ymd = day.strftime("%Y%m%d")
    year = day.strftime("%Y")
    output = OUTPUT_DIR / f"{ymd}.json"

    # 保存済みのデータは再取得しない
    if output.exists():
        try:
            with output.open("r", encoding="utf-8") as f:
                existing = json.load(f)
            if isinstance(existing.get("odds"), list):
                print(f"SKIP {ymd}")
                return "skipped"
        except (OSError, ValueError, AttributeError):
            pass

    url = f"{BASE_URL}/{year}/{ymd}.json"

    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "MipikaLabHistoricalOddsCollector/1.0"
        }
    )

    try:
        with urllib.request.urlopen(
            request, timeout=30
        ) as response:
            data = json.load(response)

        if not isinstance(data, dict):
            raise ValueError("JSON形式が不正")

        records = data.get("odds")
        if not isinstance(records, list):
            raise ValueError("odds配列がありません")

        # 元データをそのまま保存
        with output.open("w", encoding="utf-8") as f:
            json.dump(
                data,
                f,
                ensure_ascii=False,
                separators=(",", ":")
            )

        print(f"OK {ymd}: {len(records)} records")
        return "success"

    except urllib.error.HTTPError as e:
        print(f"HTTP {ymd}: {e.code}")
    except (
        urllib.error.URLError,
        TimeoutError,
        ValueError,
        OSError
    ) as e:
        print(f"ERROR {ymd}: {e}")

    return "failed"

def main():
    results = {
        "success": 0,
        "skipped": 0,
        "failed": 0
    }

    print("Mipika Lab - Historical Odds Collector")
    print(f"Period: {START_DATE} to {END_DATE}")

    for day in dates_between(START_DATE, END_DATE):
        result = download_odds(day)
        results[result] += 1

        # 公開元へのアクセス間隔
        if result != "skipped":
            time.sleep(2)

    print("----- FINISHED -----")
    print(f"Downloaded: {results['success']}")
    print(f"Skipped: {results['skipped']}")
    print(f"Failed: {results['failed']}")

if __name__ == "__main__":
    main()
