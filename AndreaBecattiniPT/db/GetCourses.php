<?php
    include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("SELECT * FROM Corso ORDER BY Nome");
	if($state->execute()){
	     echo json_encode($state->fetchAll());
	}
?>