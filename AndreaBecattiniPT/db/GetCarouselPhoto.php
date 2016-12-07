<?php
    include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
	$state= $dbh->prepare("SELECT FirstSlide,SecondSlide,ThirdSlide FROM Admin WHERE idAdmin=1");
	if($state->execute()){
	     echo json_encode($state->fetchAll());
	}
?>