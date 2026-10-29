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
    fwrite(STDERR, "ERROR: Invalid date range\n");
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
$already = 0;
$updatedDays = 0;

/*
 * 3連単120通りの確認
 */
function countValidOdds(array $odds): int
{
    $count = 0;

    foreach ($odds as $seconds) {
        if (!is_array($seconds)) {
            continue;
        }

        foreach ($seconds as $thirds) {
            if (!is_array($thirds)) {
                continue;
            }

            foreach ($thirds as $odd) {
                if (is_numeric($odd) && $odd > 0) {
                    $count++;
                }
            }
        }
    }

    return $count;
}

/*
 * 日付ごとの収集
 */
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
     * CSVがない場合は安全にスキップ
     */
    if (!file_exists($csvFile)) {
        echo "SKIP: CSV not found\n";
        continue;
    }

    /*
     * 既存JSONの読み込み
     */
    $records = [];

    if (file_exists($output)) {

        $raw = file_get_contents($output);

        if ($raw === false) {
            fwrite(
                STDERR,
                "ERROR: Cannot read existing JSON\n"
            );
            exit(1);
        }

        $decoded = json_decode($raw, true);

        if (
            !is_array($decoded) ||
            !isset($decoded['odds']) ||
            !is_array($decoded['odds'])
        ) {
            fwrite(
                STDERR,
                "ERROR: Existing JSON is invalid\n"
            );
            exit(1);
        }

        foreach ($decoded['odds'] as $record) {

            if (!is_array($record)) {
                fwrite(
                    STDERR,
                    "ERROR: Invalid existing record\n"
                );
                exit(1);
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
                fwrite(
                    STDERR,
                    "ERROR: Invalid existing race key\n"
                );
                exit(1);
            }

            $key = "$stadium-$race";

            $records[$key] = $record;
        }

        echo "EXISTING: "
            . count($records)
            . " races\n";
    }

    /*
     * CSVから対象レースを取得
     */
    $handle = fopen($csvFile, 'r');

    if ($handle === false) {
        fwrite(
            STDERR,
            "ERROR: Cannot open CSV\n"
        );
        exit(1);
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
        . " races\n";

    $changed = false;

    /*
     * 未取得レースのみ再取得
     */
    foreach ($races as $key => [$stadium, $race]) {

        $total++;

        /*
         * 保存済みなら取得しない
         */
        if (isset($records[$key])) {

            $savedOdds =
                $records[$key]['trifecta_odds']
                ?? [];

            if (
                is_array($savedOdds) &&
                countValidOdds($savedOdds) === 120
            ) {
                $already++;

                echo "EXISTS: "
                    . "$stadium / $race\n";

                continue;
            }

            /*
             * 保存済みだが不完全なら再取得
             */
            echo "RETRY INCOMPLETE: "
                . "$stadium / $race\n";
        }

        try {

            $result = BoatcastScraper::scrapeOdds(
                $date,
                $stadium,
                $race
            )->getValue();

            $trifecta =
                $result['trifecta'] ?? [];

            $valid = is_array($trifecta)
                ? countValidOdds($trifecta)
                : 0;

            $fixed =
                $result['is_fixed'] ?? false;

            /*
             * 完全な確定オッズのみ保存
             */
            if (
                $valid === 120 &&
                $fixed
            ) {

                $records[$key] = [
                    'date' => $date,
                    'stadium_number' => $stadium,
                    'number' => $race,
                    'trifecta_odds' => $trifecta
                ];

                $success++;

                $changed = true;

                echo "RECOVERED: "
                    . "$stadium / $race "
                    . "(120/120)\n";

            } else {

                $failed++;

                echo "NO DATA: "
                    . "$stadium / $race "
                    . "($valid/120)\n";
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
     * 新規取得があった場合だけ保存
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
            fwrite(
                STDERR,
                "ERROR: JSON encoding failed\n"
            );
            exit(1);
        }

        /*
         * 一時ファイルを経由して安全に更新
         */
        $temporary = $output . '.tmp';

        if (
            file_put_contents(
                $temporary,
                $json,
                LOCK_EX
            ) === false
        ) {
            fwrite(
                STDERR,
                "ERROR: Cannot write temporary file\n"
            );
            exit(1);
        }

        if (!rename($temporary, $output)) {
            @unlink($temporary);

            fwrite(
                STDERR,
                "ERROR: Cannot replace JSON\n"
            );
            exit(1);
        }

        $updatedDays++;

        echo "SAVED: "
            . count($records)
            . " races\n";

    } else {

        echo "NO NEW DATA\n";
    }
}

/*
 * 最終結果
 */
echo "\n";
echo "===== FINISHED =====\n";

echo "TOTAL TARGETS: $total\n";

echo "ALREADY SAVED: $already\n";

echo "RECOVERED: $success\n";

echo "FAILED: $failed\n";

echo "UPDATED DAYS: $updatedDays\n";

echo "====================\n";
