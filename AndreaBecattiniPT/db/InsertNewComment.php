<?php
    session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
    $state= $dbh->prepare("INSERT INTO Commenti (Descrizione,Data,Utente_idUtente,Ora) VALUES (:desc,:data,:id,:ora)");
    $state->bindValue(":desc",$data->desc);
    $state->bindValue(":data",$data->data);
    $state->bindValue(":id",$_SESSION["userid"]);
    $state->bindValue(":ora",$data->ora);
    if($state->execute())
    {
        $state2 = $dbh->prepare("INSERT INTO CA (idArticolo,idCommento) VALUES (:A,:C)");
        $state2->bindValue(":A",$data->art);
        $state2->bindValue(":C",$dbh->lastInsertId());
        if($state2->execute())
            echo 1;
        else 
            echo 0;
    }
    else
        echo 0;
?>