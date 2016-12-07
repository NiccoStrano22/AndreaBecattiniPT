<?php
    session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("UPDATE Articolo SET Titolo=:nome, Descrizione=:desc, Immagine=:img, idAdmin=:idA WHERE idArticolo=:id");
    $state->bindValue(":id",$data->id);
	$state->bindValue(":nome",$data->nome);
	$state->bindValue(":idA",$_SESSION['userid']);
	$state->bindValue(":desc",$data->desc);
    $state->bindValue(":img",$data->img);
	if($state->execute())
	     echo 1;
	else
		echo 0;
?>