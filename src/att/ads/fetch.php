<?php
    error_reporting(0);
    define('ROOT', str_replace('\\', '/', dirname(__FILE__)) . '/');

    $callback = isset($_GET['callback']) ? $_GET['callback'] : '';
    $result = array();

    function getImages($number){
        $result = array();
        $base_src = implode('/', array(ROOT, '..', 'haixuan', $number));
        if($dh = opendir($base_src)){
            while(false !== ($file = readdir($dh))){
                $path = implode('/', array($base_src, $file));
                if(is_file($path)){
                    array_push($result, implode('/', array('haixuan', $number, $file)));
                }
            }
        }
        return $result;
    }

    $result['images'] = array();
    $result['images']['1'] = getImages('1');
    $result['images']['2'] = getImages('2');
    $result['images']['3'] = getImages('3');
    $result['error'] = 0;

    $result = json_encode($result);
    if ($callback) {
        $result = $callback . ' && ' . $callback . '(' . $result . ');';
    }
    echo $result;
?>