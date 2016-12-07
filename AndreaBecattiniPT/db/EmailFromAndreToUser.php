<?php
	$data = json_decode(file_get_contents("php://input"));
	$headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=windows-1252' . "\r\n";
    $headers .= 'From: "'.$data->header.'" <andreabecattinipt@gmail.com>' . "\r\n";
    $baseUri = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['REQUEST_URI'],0,strrpos($_SERVER['REQUEST_URI'],'/')).'/';
    $msg = '<p>'.$data->msg.'</p>';
    if (mail($data->email,$data->header,$msg,$headers))
        echo 1;
    else
        echo 0;

?>