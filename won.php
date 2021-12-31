<?php

$stats = json_decode(file_get_contents(__DIR__ . '/stats.json'));
if ($stats !== null) {
    if (isset($stats->won)) {
        $stats->won++;
    } else {
        $stats->won = 1;
    }
    file_put_contents(__DIR__ . '/stats.json', json_encode($stats));
}
