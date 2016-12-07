<?php
    include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
    $data = json_decode(file_get_contents("php://input"));
	$state= $dbh->prepare("SELECT * FROM Foto WHERE idFoto != :id");
    $state->bindValue(':id',$data->id);
	if($state->execute()){
	     echo json_encode($state->fetchAll());
	}
?>