<?php
    session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh=new PDO($conn,$user,$pass);
    $state= $dbh->prepare("INSERT INTO Articolo (Titolo,Descrizione,DataPubblicazione,idAdmin,Immagine) VALUES (:nome,:desc,:data,:id,:img)");
    $state->bindValue(":nome",$data->nome);
    $state->bindValue(":desc",$data->desc);
    $state->bindValue(":data",$data->data);
    $state->bindValue(":id",$_SESSION["userid"]);
    $state->bindValue(":img",$data->img);
    if($state->execute())
        echo 1;
    else
        echo 0;
?>