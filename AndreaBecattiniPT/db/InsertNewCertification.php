<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("INSERT INTO Certificazione  (Corso,Data,idAdmin,Luogo) VALUES (:c,:d,:id,:l)");
	$state->bindValue(":c",$data->c);
	$state->bindValue(":d",$data->d);
	$state->bindValue(":id",$_SESSION['userid']);
	$state->bindValue(":l",$data->l);
	if($state->execute())
	   echo 1;
	else
		echo 0;
	
?>