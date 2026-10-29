<?php
declare(strict_types=1);

use Boatrace\BoatcastScraper\BoatcastScraper;

require __DIR__ . '/../vendor/autoload.php';

set_time_limit(0);

$start = new DateTimeImmutable(
    $argv[1] ?? '2026-10-29'
);

$end = new DateTimeImmutable(
    $argv[2] ?? '2026-10-29'
);

if ($start > $end) {
    exit("ERROR: Invalid date range\n");
}

$root = dirname(__DIR__);

$csvDir = $root . '/data/csv_odds';
$outputDir = $root . '/data/boatcast_odds';

if (!is_dir($outputDir)) {
    mkdir($outputDir, 0775, true);
}

/*
 * 3連単オッズの完全性を確認する。
 *
 * 6艇立て：120通り
 * 5艇立て： 60通り
 *
 * 数だけでなく、すべての組み合わせが
 * 存在するかも確認する。
 */
function validateOdds(array $odds): array
{
    $combinations = [];
    $boats = [];

    foreach ($odds as $first => $seconds) {

        if (!is_array($seconds)) {
            continue;
        }

        foreach ($seconds as $second => $thirds) {

            if (!is_array($thirds)) {
                continue;
            }

            foreach ($thirds as $third => $odd) {

                $a = (int)$first;
                $b = (int)$second;
                $c = (int)$third;

                if (
                    $a < 1 || $a > 6 ||
                    $b < 1 || $b > 6 ||
                    $c < 1 || $c > 6 ||
                    $a === $b ||
                    $a === $c ||
                    $b === $c ||
                    !is_numeric($odd) ||
                    (float)$odd <= 0
                ) {
                    continue;
                }

                $key = "$a-$b-$c";

                $combinations[$key] = true;

                $boats[$a] = true;
                $boats[$b] = true;
                $boats[$c] = true;
            }
        }
    }

    $count = count($combinations);
    $boatCount = count($boats);

    if (
        !(
            ($boatCount === 6 && $count === 120) ||
            ($boatCount === 5 && $count === 60)
        )
    ) {
        return [
            'valid' => false,
            'count' => $count,
            'boats' => $boatCount
        ];
    }

    /*
     * 全組み合わせを確認
     */
    $numbers = array_keys($boats);

    foreach ($numbers as $a) {
        foreach ($numbers as $b) {
            foreach ($numbers as $c) {

                if (
                    $a === $b ||
                    $a === $c ||
                    $b === $c
                ) {
                    continue;
                }

                if (
                    !isset(
                        $combinations["$a-$b-$c"]
                    )
                ) {
                    return [
                        'valid' => false,
                        'count' => $count,
                        'boats' => $boatCount
                    ];
                }
            }
        }
    }

    return [
        'valid' => true,
        'count' => $count,
        'boats' => $boatCount
    ];
}

$total = 0;
$already = 0;
$recovered = 0;
$failed = 0;
$updatedDays = 0;

for (
    $day = $start;
    $day <= $end;
    $day = $day->modify('+1 day')
) {

    $date = $day->format('Y-m-d');
    $ymd = $day->format('Ymd');

    $csvFile = "$csvDir/$ymd.csv";
    $output = "$outputDir/$ymd.json";

    echo "\n====================\n";
    echo "DATE: $date\n";
    echo "====================\n";

    /*
     * CSVの存在確認
     */
    if (!file_exists($csvFile)) {
        echo "SKIP: No CSV\n";
        continue;
    }

    /*
     * 既存データを読み込む
     */
    $records = [];

    if (file_exists($output)) {

        $raw = file_get_contents($output);

        if ($raw === false) {
            exit("ERROR: Cannot read JSON\n");
        }

        $decoded = json_decode($raw, true);

        if (
            !is_array($decoded) ||
            !isset($decoded['odds']) ||
            !is_array($decoded['odds'])
        ) {
            exit("ERROR: Invalid JSON\n");
        }

        foreach ($decoded['odds'] as $record) {

            if (!is_array($record)) {
                exit("ERROR: Invalid record\n");
            }

            $stadium = (int)(
                $record['stadium_number'] ?? 0
            );

            $race = (int)(
                $record['number'] ?? 0
            );

            if (
                $stadium < 1 ||
                $stadium > 24 ||
                $race < 1 ||
                $race > 12
            ) {
                exit("ERROR: Invalid race key\n");
            }

            $key = "$stadium-$race";

            $records[$key] = $record;
        }

        echo "EXISTING: "
            . count($records)
            . "\n";
    }

    /*
     * 対象レースをCSVから抽出
     */
    $handle = fopen($csvFile, 'r');

    if ($handle === false) {
        exit("ERROR: Cannot open CSV\n");
    }

    fgetcsv($handle);

    $races = [];

    while (($row = fgetcsv($handle)) !== false) {

        if (count($row) < 4) {
            continue;
        }

        $stadium = (int)trim($row[2]);
        $race = (int)trim($row[3]);

        if (
            $stadium < 1 ||
            $stadium > 24 ||
            $race < 1 ||
            $race > 12
        ) {
            continue;
        }

        $key = "$stadium-$race";

        $races[$key] = [
            $stadium,
            $race
        ];
    }

    fclose($handle);

    echo "TARGET: "
        . count($races)
        . "\n";

    $changed = false;

    /*
     * 未取得・不完全なレースだけ再取得
     */
    foreach ($races as $key => [$stadium, $race]) {

        $total++;

        if (isset($records[$key])) {

            $savedOdds =
                $records[$key]['trifecta_odds']
                ?? [];

            if (is_array($savedOdds)) {

                $check = validateOdds($savedOdds);

                if ($check['valid']) {

                    $already++;

                    echo "EXISTS: "
                        . "$stadium / $race "
                        . "("
                        . $check['count']
                        . " odds)\n";

                    continue;
                }
            }
        }

        try {

            $result = BoatcastScraper::scrapeOdds(
                $date,
                $stadium,
                $race
            )->getValue();

            $trifecta =
                $result['trifecta'] ?? [];

            $fixed =
                $result['is_fixed'] ?? false;

            $check = is_array($trifecta)
                ? validateOdds($trifecta)
                : [
                    'valid' => false,
                    'count' => 0,
                    'boats' => 0
                ];

            if (
                $check['valid'] &&
                $fixed
            ) {

                $records[$key] = [
                    'date' => $date,
                    'stadium_number' => $stadium,
                    'number' => $race,
                    'trifecta_odds' => $trifecta
                ];

                $recovered++;
                $changed = true;

                echo "RECOVERED: "
                    . "$stadium / $race "
                    . "("
                    . $check['boats']
                    . " boats, "
                    . $check['count']
                    . " odds)\n";

            } else {

                $failed++;

                echo "NO DATA: "
                    . "$stadium / $race "
                    . "("
                    . $check['count']
                    . " odds, "
                    . $check['boats']
                    . " boats, fixed="
                    . ($fixed ? 'YES' : 'NO')
                    . ")\n";
            }

        } catch (Throwable $e) {

            $failed++;

            echo "ERROR: "
                . "$stadium / $race: "
                . $e->getMessage()
                . "\n";
        }

        usleep(500000);
    }

    /*
     * 新規データがある場合のみ保存
     */
    if ($changed) {

        ksort($records);

        $json = json_encode(
            [
                'odds' => array_values($records)
            ],
            JSON_UNESCAPED_UNICODE
        );

        if ($json === false) {
            exit("ERROR: JSON encoding\n");
        }

        $temporary = $output . '.tmp';

        if (
            file_put_contents(
                $temporary,
                $json,
                LOCK_EX
            ) === false
        ) {
            exit("ERROR: Writing JSON\n");
        }

        if (!rename($temporary, $output)) {
            @unlink($temporary);
            exit("ERROR: Replacing JSON\n");
        }

        $updatedDays++;

        echo "SAVED: "
            . count($records)
            . " races\n";

    } else {

        echo "NO NEW DATA\n";
    }
}

echo "\n===== FINISHED =====\n";
echo "TOTAL TARGETS: $total\n";
echo "ALREADY SAVED: $already\n";
echo "RECOVERED: $recovered\n";
echo "FAILED: $failed\n";
echo "UPDATED DAYS: $updatedDays\n";
echo "====================\n";
