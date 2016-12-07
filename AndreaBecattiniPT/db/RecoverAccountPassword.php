<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
	$dbh = new PDO($conn, $user, $pass);
	$query = $dbh->prepare("SELECT Nome,Password FROM Utente WHERE Email=:email");
	$query->bindValue(':email',$data->email);
	if($query->execute())
	{
    	if($query->rowCount()>0){
        	while($r = $query->fetch())
            {
            	$nome = $r['Nome'];
                $password = $r['Password'];
            }
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=windows-1252' . "\r\n";
            $headers .= 'From: "AndreaBecattiniPT | Nuovo Commento" <andreabecattinipt@gmail.com>' . "\r\n";
            $baseUri = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['REQUEST_URI'],0,strrpos($_SERVER['REQUEST_URI'],'/')).'/';
            $msg = '<p>Ecco la tua password: <b>'.$password.'</b><br /></p>';
            if (mail($data->email,"Recupera Password | Andrea Becattini PT",$msg,$headers))
              echo 1;
            else
              echo 0;
        }
       	else
        	echo 0;
	}
    else
    	echo 0;
?>

