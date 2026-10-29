<?php
declare(strict_types=1);

use Boatrace\BoatcastScraper\BoatcastScraper;

require __DIR__ . '/../vendor/autoload.php';

set_time_limit(0);

$start = new DateTimeImmutable($argv[1] ?? '2026-07-20');
$end = new DateTimeImmutable($argv[2] ?? '2026-07-20');

if ($start > $end) {
    fwrite(STDERR, "ERROR: Start date is after end date.\n");
    exit(1);
}

$root = dirname(__DIR__);
$csvDir = $root . '/data/csv_odds';
$outputDir = $root . '/data/boatcast_odds';

if (!is_dir($outputDir)) {
    mkdir($outputDir, 0775, true);
}

$total = 0;
$success = 0;
$failed = 0;
$skipped = 0;

for ($day = $start; $day <= $end; $day = $day->modify('+1 day')) {
    $date = $day->format('Y-m-d');
    $ymd = $day->format('Ymd');

    $csvFile = "$csvDir/$ymd.csv";
    $output = "$outputDir/$ymd.json";

    if (file_exists($output)) {
        echo "SKIP $date: already collected\n";
        $skipped++;
        continue;
    }

    if (!file_exists($csvFile)) {
        echo "SKIP $date: no CSV\n";
        $skipped++;
        continue;
    }

    $handle = fopen($csvFile, 'r');

    if ($handle === false) {
        echo "ERROR $date: cannot open CSV\n";
        $failed++;
        continue;
    }

    $header = fgetcsv($handle);
    $races = [];

    while (($row = fgetcsv($handle)) !== false) {
        if (count($row) < 4) {
            continue;
        }

        $stadium = (int) trim($row[2]);
        $race = (int) trim($row[3]);

        if (
            $stadium < 1 || $stadium > 24 ||
            $race < 1 || $race > 12
        ) {
            continue;
        }

        $races["$stadium-$race"] = [$stadium, $race];
    }

    fclose($handle);

    echo "$date: " . count($races) . " races found\n";

    $records = [];

    foreach ($races as [$stadium, $race]) {
        $total++;

        try {
            $result = BoatcastScraper::scrapeOdds(
                $date,
                $stadium,
                $race
            )->getValue();

            $trifecta = $result['trifecta'] ?? [];
            $valid = 0;

            foreach ($trifecta as $seconds) {
                if (!is_array($seconds)) {
                    continue;
                }

                foreach ($seconds as $thirds) {
                    if (!is_array($thirds)) {
                        continue;
                    }

                    foreach ($thirds as $odd) {
                        if (is_numeric($odd) && $odd > 0) {
                            $valid++;
                        }
                    }
                }
            }

            if (
                $valid === 120 &&
                ($result['is_fixed'] ?? false)
            ) {
                $records[] = [
                    'date' => $date,
                    'stadium_number' => $stadium,
                    'number' => $race,
                    'trifecta_odds' => $trifecta
                ];

                $success++;

                echo "OK: $stadium / $race (120/120)\n";
            } else {
                $failed++;

                echo "NO DATA: $stadium / $race ($valid/120)\n";
            }
        } catch (Throwable $e) {
            $failed++;

            echo "ERROR: $stadium / $race: "
                . $e->getMessage() . "\n";
        }

        usleep(500000);
    }

    if (count($records) > 0) {
        $json = json_encode(
            ['odds' => $records],
            JSON_UNESCAPED_UNICODE
        );

        if ($json === false || file_put_contents($output, $json) === false) {
            fwrite(STDERR, "ERROR: Could not save $output\n");
            exit(1);
        }

        echo "SAVED $date: " . count($records) . " races\n";
    } else {
        echo "NO SAVED DATA: $date\n";
    }
}

echo "\n----- FINISHED -----\n";
echo "TOTAL: $total\n";
echo "SUCCESS: $success\n";
echo "FAILED: $failed\n";
echo "SKIPPED DAYS: $skipped\n";
