<?php
    include 'conn.inc.php';
    $dbh=new PDO($conn,$user,$pass);
    $state2 = $dbh->prepare("set lc_time_names = 'it_IT'");
    if($state2->execute()){
        $state= $dbh->prepare("SELECT idCertificazione,Data,YEAR(Data) as Year,CONCAT(UPPER(LEFT(MONTHNAME(Data),1)),LOWER(SUBSTRING(MONTHNAME(Data) FROM 2))) as DataInParole, Corso, Luogo FROM Certificazione ORDER BY Data DESC");
        if($state->execute()){
             echo json_encode($state->fetchAll());
        }
    }
?>