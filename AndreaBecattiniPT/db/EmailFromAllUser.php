<?php
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("SELECT Email FROM Utente WHERE idUtente>1");
    if($state->execute())
    {
    	if($data->post == "Foto"){
        	$test = "una nuova foto";
            $titolo = "Nuova Foto: ".$data->nome;
            $link = "andreabecattinipt.altervista.org/#/fotoDet/";
            $state2 = $dbh->prepare("SELECT idFoto AS id FROM Foto WHERE Titolo=:nome LIMIT 1");
            $state2->bindValue(':nome', $data->nome);
        }
        if($data->post == "Video"){
        	$test = "un nuovo video";
            $titolo = "Nuovo Video: ".$data->nome;
            $link ="andreabecattinipt.altervista.org/#/detailsVideo/";
            $state2 = $dbh->prepare("SELECT idVideo AS id FROM Video WHERE Titolo=:nome LIMIT 1");
            $state2->bindValue(':nome', $data->nome);
        }
        if($data->post == "Articolo"){
        	$test = "un nuovo articolo";
            $titolo = "Nuovo Articolo: ".$data->nome;
            $link = "andreabecattinipt.altervista.org/#/details/";
            $state2 = $dbh->prepare("SELECT idArticolo AS id FROM Articolo WHERE Titolo=:nome LIMIT 1");
            $state2->bindValue(':nome', $data->nome);
        }
        if($state2->execute()){
            while($r = $state2->fetch()){
				 $link.= $r['id'];
            }
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=windows-1252' . "\r\n";
            $headers .= 'From: " Andrea Becattini PT | '.$titolo.'" <andreabecattinipt@gmail.com>' . "\r\n";
            $baseUri = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['REQUEST_URI'],0,strrpos($_SERVER['REQUEST_URI'],'/')).'/';
            $msg = '<p>Ciao,<br />ho appena pubblicato '.$test.'.<br />Guarda subito il mio nuovo post cliccando sul link <a target="_blank" href="'.$link.'">'.$data->nome.'</a></p>';
            while($r = $state->fetch()){
                //$email.=$r['Email'].", "; 
                mail($r['Email'],$titolo,$msg,$headers);
            }
            echo 1;
       	}
        else
        	echo 0;
    }
    else
    	echo 0;
?>