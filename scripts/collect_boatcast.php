
<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Boatrace\BoatcastScraper\BoatcastScraper;

set_time_limit(0);

$start = new DateTimeImmutable('2026-01-01');
$end = new DateTimeImmutable('2026-10-29');
$outputDir = __DIR__ . '/../data/boatcast_odds';
$csvDir = __DIR__ . '/../data/csv_odds';

if (!is_dir($outputDir)) {
    mkdir($outputDir, 0775, true);
}

$totalDays = 0;
$savedDays = 0;
$success = 0;
$failed = 0;

for ($day = $start; $day <= $end; $day = $day->modify('+1 day')) {
    $date = $day->format('Y-m-d');
    $ymd = $day->format('Ymd');
    $output = "$outputDir/$ymd.json";

    if (file_exists($output)) {
        echo "SKIP $date: already saved\n";
        continue;
    }

    // CSVがある日を対象にする
    if (!file_exists("$csvDir/$ymd.csv")) {
        echo "SKIP $date: no CSV\n";
        continue;
    }

    $totalDays++;
    $records = [];

    // まず開催場を1～24で確認
    for ($stadium = 1; $stadium <= 24; $stadium++) {
        for ($race = 1; $race <= 12; $race++) {
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

                if ($valid === 120 && ($result['is_fixed'] ?? false)) {
                    $records[] = [
                        'date' => $date,
                        'stadium_number' => $stadium,
                        'number' => $race,
                        'trifecta_odds' => $trifecta
                    ];
                    $success++;
                } else {
                    $failed++;
                }
            } catch (Throwable $e) {
                $failed++;
            }

            usleep(300000);
        }
    }

    if ($records) {
        file_put_contents(
            $output,
            json_encode(
                ['odds' => $records],
                JSON_UNESCAPED_UNICODE
            )
        );
        $savedDays++;
    }

    echo "$date: " . count($records) . " races saved\n";
}

echo "DAYS CHECKED: $totalDays\n";
echo "DAYS SAVED: $savedDays\n";
echo "SUCCESS RACES: $success\n";
echo "OTHER RESULTS: $failed\n";
