<?php
    error_reporting(0);
    $globeie_service = '@@SERVICE';
    $callback = isset($_GET['callback']) ? $_GET['callback'] : '';
    $device = isset($_GET['device']) ? $_GET['device'] : '';
    $result = array();
    $matches = array();

    /**
    * 参考：
    * http://www.phper.org.cn/index.php?m=content&a=show&post_id=372
    * http://www.kenlins.com/blog_show.php?id=19
    */
    function uni_encode($word)
    {
        $word0 = iconv('gbk', 'utf-8', $word);
        $word1 = iconv('utf-8', 'gbk', $word0);
        $word =  ($word1 == $word) ? $word0 : $word;
        $word = json_encode($word);
        $word = preg_replace_callback('/\\\\u(\w{4})/', create_function('$hex', 'return \'&#\'.hexdec($hex[1]).\';\';'), substr($word, 1, strlen($word)-2));
        return $word;
    }

    try{
        $content = @file_get_contents($globeie_service . '?device=' . $device);
        if(strlen($content) > 0){
            $pattern = '~<td height="106"><div align=center><span class="STYLE9">(.+)?</div></td>(?:.|\n)*?<td><div align=center><span class="STYLE9">(.+)?</td>(?:.|\n)*?<td><div align=center><span class="STYLE9">(.+)?</td>~';
            $count = preg_match($pattern, $content, $matches, PREG_OFFSET_CAPTURE, 3);
            if($count > 0){
                $result['error'] = 0;
                $result['time'] = $matches[1][0];
                $result['number'] = $matches[2][0];
                $result['name'] = uni_encode($matches[3][0]);
            }else{
                $result['error'] = '102';
            }
        }else{
            $result['error'] = '101';
        }
    }catch(Exception  $ex){
        $result['error'] = '201';
    }
    $result = json_encode($result);
    if ($callback) {
        $result = $callback . ' && ' . $callback . '(' . $result . ');';
    }
    echo $result;
?>