<?php
    require_once('errors.conf.php');
    require_once('../config/email.conf.php');
    require_once('vendor/phpmailer/phpmailer/PHPMailerAutoload.php');

    function sendErrorMail($floor, $err, $count){
        global $EMAIL, $ERRORS;
        $Subject = '出现了未定义的报警';
        if(array_key_exists($err, $ERRORS)){
            $Subject = $floor . "层考勤机：[" . $err . "]" . $ERRORS[$err];
        }
        $Body = $Subject;
        if($count){
            $Body .= "，已经报警" . $count . "次";
        }
        $Body .= '。';
        $mail = new PHPMailer;

        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->CharSet = 'utf-8';
        $mail->Host = $EMAIL['Host'];                         // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = $EMAIL['Username'];                 // SMTP username
        $mail->Password = $EMAIL['Password'];                 // SMTP password
        //$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

        $mail->From = $EMAIL['From'];
        $mail->FromName = $EMAIL['FromName'];
        if($EMAIL['To'] && is_array($EMAIL['To'])){
            for ($i=0; $i < count($EMAIL['To']); $i++) { 
                $mail->addAddress($EMAIL['To'][$i]);         // Name is optional
            }
        }
        $mail->isHTML(false);                                 // Set email format to HTML

        $mail->Subject = $Subject;
        $mail->Body    = $Body;

        $result = 'ok';
        if(!$mail->send()) {
            $result = $mail->ErrorInfo;
        }
        return $result;
    }

    $floor = isset($_GET['floor']) ? $_GET['floor'] : '';
    $err = isset($_GET['err']) ? $_GET['err'] : 0;
    $count = isset($_GET['count']) ? $_GET['count'] : 0;

    $result = 'OK';
    try{
        if($err > 0){
            $result = sendErrorMail($floor, $err, $count);
        }else{
            $result = 'err === 0';
        }

    }catch(Exception  $ex){
        $result = 'exception';
    }
    echo $result;
?>