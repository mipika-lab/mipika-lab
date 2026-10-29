
<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Boatrace\BoatcastScraper\BoatcastScraper;

$date = $argv[1] ?? '2026-05-18';
$stadiums = [2]; // まず戸田だけテスト
$races = range(1, 12);

$outputDir = __DIR__ . '/../data/boatcast_odds';
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0775, true);
}

$records = [];
$success = 0;
$failed = 0;

foreach ($stadiums as $stadium) {
    foreach ($races as $race) {
        echo "Checking $date / venue $stadium / race $race\n";

        try {
            $result = BoatcastScraper::scrapeOdds(
                $date, $stadium, $race
            )->getValue();

            $trifecta = $result['trifecta'] ?? [];
            $valid = 0;

            foreach ($trifecta as $seconds) {
                if (!is_array($seconds)) continue;
                foreach ($seconds as $thirds) {
                    if (!is_array($thirds)) continue;
                    foreach ($thirds as $odd) {
                        if (is_numeric($odd) && $odd > 0) {
                            $valid++;
                        }
                    }
                }
            }

            if ($valid > 0 && ($result['is_fixed'] ?? false)) {
                $records[] = [
                    'date' => $date,
                    'stadium_number' => $stadium,
                    'number' => $race,
                    'trifecta_odds' => $trifecta,
                    'valid_count' => $valid
                ];
                $success++;
                echo "OK: $valid / 120\n";
            } else {
                $failed++;
                echo "NO DATA: $valid / 120\n";
            }
        } catch (Throwable $e) {
            $failed++;
            echo "ERROR: " . $e->getMessage() . "\n";
        }
    }
}

if ($success > 0) {
    $file = $outputDir . '/' .
        str_replace('-', '', $date) . '.json';

    file_put_contents(
        $file,
        json_encode(
            ['odds' => $records],
            JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
        )
    );

    echo "Saved: $file\n";
}

echo "SUCCESS: $success\n";
echo "FAILED: $failed\n";

if ($success === 0) {
    exit(1);
}
