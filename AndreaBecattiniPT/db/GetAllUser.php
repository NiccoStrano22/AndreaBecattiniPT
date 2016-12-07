<?php
    include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("SELECT * FROM Utente WHERE idUtente!=1 ORDER BY Nome ASC");
	if($state->execute()){
	     echo json_encode($state->fetchAll());
	}
?>