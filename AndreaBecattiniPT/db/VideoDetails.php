<?php
	session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("SELECT *
						   FROM Video
						   WHERE idVideo=:id");
	$state->bindValue(":id",$data->id);
	if($state->execute()){
	    echo json_encode($state->fetchAll());
	}
?>