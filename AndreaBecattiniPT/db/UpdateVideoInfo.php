<?php
    session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("UPDATE Video SET Descrizione=:d, Titolo=:t WHERE idVideo=:id");
    $state->bindValue(":id",$data->id);
    $state->bindValue(":d",$data->d);
    $state->bindValue(":t",$data->t);
	if($state->execute())
	     echo 1;
	else
		echo 0;
?>