<?php
    session_start();
    include 'conn.inc.php';
    $dbh = new PDO($conn,$user,$pass);
    if($_SESSION['io'] == 0){
        $state = $dbh->prepare("SELECT * FROM Utente WHERE idUtente=:id");
        $state->bindValue(':id',$_SESSION['userid']);
        if($state->execute())
            echo json_encode($state->fetchAll());
    }
    else{
         $state = $dbh->prepare("SELECT * FROM Admin WHERE idAdmin=:id");
         $state->bindValue(':id',$_SESSION['userid']);
         if($state->execute())
            echo json_encode($state->fetchAll());
    }
?>