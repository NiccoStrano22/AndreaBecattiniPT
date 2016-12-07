<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("INSERT INTO Corso (Nome) VALUES (:c)");
	$state->bindValue(":c",$data->c);
	if($state->execute())
	   echo 1;
	else
		echo 0;
	
?>