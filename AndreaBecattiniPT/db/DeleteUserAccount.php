<?php
	session_start();
	include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("DELETE FROM Utente WHERE idUtente=:id");
	$state->bindValue(":id",$_SESSION['userid']);
	if($state->execute()){
		session_unset();
        session_destroy();
        echo 1;
	}
	else
		echo 0;
?>