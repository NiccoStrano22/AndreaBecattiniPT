<?php
	$data = json_decode(file_get_contents("php://input"));
	$headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=windows-1252' . "\r\n";
    $headers .= 'From: "AndreaBecattiniPT | Nuovo Commento" <niccostrano22@gmail.com>' . "\r\n";
    $baseUri = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['REQUEST_URI'],0,strrpos($_SERVER['REQUEST_URI'],'/')).'/';
    $msg = '<p>Ciao andrea <br />, '.$data->utente.' ha lasciato un nuovo commento al post: '.$data->post.'.<br />Visualizza il nuovo commento e rispondi subito.</p>';
    if (mail($data->email,"Nuovo commento",$msg,$headers))
        echo 1;
    else
        echo 0;

?>