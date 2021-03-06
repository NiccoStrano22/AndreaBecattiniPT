<?php
    session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("UPDATE Utente SET PasswCriptata=MD5(:pw),Image=:i,Password=:p WHERE idUtente=:id");
    $state->bindValue(":id",$_SESSION['userid']);
	$state->bindValue(":pw",$data->pw);
    $state->bindValue(":p",$data->pw);
	if($data->img == null)
        $path = 'myIMG/account.jpg';
    else{
    	$path = $data->img;
    }
    $state->bindValue(":i",$path);
	if($state->execute())
	    echo 1;
	else
		echo 0;
?>