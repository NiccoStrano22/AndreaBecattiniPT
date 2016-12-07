<?php
    session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
    if($data->number == 1)
	   $state= $dbh->prepare("UPDATE Admin SET FirstSlide=:f WHERE idAdmin=1");
    else if($data->number == 2)
        $state= $dbh->prepare("UPDATE Admin SET SecondSlide=:f WHERE idAdmin=1");
    else 
        $state= $dbh->prepare("UPDATE Admin SET ThirdSlide=:f WHERE idAdmin=1");
    $state->bindValue(":f",$data->img);
	if($state->execute())
	     echo 1;
	else
		echo 0;
?>
