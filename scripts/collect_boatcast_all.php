<?php
declare(strict_types=1);

use Boatrace\BoatcastScraper\BoatcastScraper;

require __DIR__ . '/../vendor/autoload.php';

set_time_limit(0);

$start = new DateTimeImmutable($argv[1] ?? '2026-07-25');
$end = new DateTimeImmutable($argv[2] ?? '2026-07-25');

if ($start > $end) {
    exit("ERROR: Invalid date range\n");
}

$root = dirname(__DIR__);
$outputDir = $root . '/data/boatcast_odds';

if (!is_dir($outputDir)) {
    mkdir($outputDir, 0775, true);
}

$total = 0;
$success = 0;
$failed = 0;

for ($day = $start; $day <= $end; $day = $day->modify('+1 day')) {
    $date = $day->format('Y-m-d');
    $ymd = $day->format('Ymd');
    $output = "$outputDir/$ymd.json";

    if (file_exists($output)) {
        echo "SKIP $date: already collected\n";
        continue;
    }

    $records = [];

    for ($stadium = 1; $stadium <= 24; $stadium++) {
        for ($race = 1; $race <= 12; $race++) {
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

                    echo "OK $date $stadium/$race\n";
                } else {
                    $failed++;
                }
            } catch (Throwable $e) {
                $failed++;
                echo "ERROR $date $stadium/$race: "
                    . $e->getMessage() . "\n";
            }

            usleep(500000);
        }
    }

    if ($records) {
        $json = json_encode(
            ['odds' => $records],
            JSON_UNESCAPED_UNICODE
        );

        if ($json === false ||
            file_put_contents($output, $json) === false) {
            exit("ERROR: Cannot save $output\n");
        }

        echo "SAVED $date: "
            . count($records) . " races\n";
    }
}

echo "TOTAL: $total\n";
echo "SUCCESS: $success\n";
echo "FAILED: $failed\n";

