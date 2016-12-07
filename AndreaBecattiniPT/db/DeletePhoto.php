<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("DELETE FROM Foto WHERE idFoto=:id");
	$state->bindValue(":id",$data->id);
	if($state->execute())
	   echo 1;
	else
		echo 0;
	
?>