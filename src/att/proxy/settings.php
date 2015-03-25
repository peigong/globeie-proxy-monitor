<?php
    error_reporting(0);
    require_once('../config/focus-date.conf.php');
    require_once('../config/focus-time.conf.php');
    
    $callback = isset($_GET['callback']) ? $_GET['callback'] : '';
    $result = array(
        'error' => 0,
        'date' => $FOCUS_DATE,
        'time' => $FOCUS_TIME
        );

    $result = json_encode($result);
    if ($callback) {
        $result = $callback . ' && ' . $callback . '(' . $result . ');';
    }
    echo $result;
?>