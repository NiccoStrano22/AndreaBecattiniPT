<?php
    include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("SELECT * FROM Articolo ORDER BY DataPubblicazione DESC");
	if($state->execute()){
	     echo json_encode($state->fetchAll());
	}
?>