<?php
    include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
    $data = json_decode(file_get_contents("php://input"));
    if($data->number == 1)
	    $state = $dbh->prepare("SELECT FirstSlide FROM Admin WHERE idAdmin=1");
	else if($data->number == 2)
        $state = $dbh->prepare("SELECT SecondSlide FROM Admin WHERE idAdmin=1");
    else
        $state = $dbh->prepare("SELECT ThirdSlide FROM Admin WHERE idAdmin=1");
    if($state->execute()){
	     echo json_encode($state->fetchAll());
	}
?>