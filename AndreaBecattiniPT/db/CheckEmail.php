<?php

    session_start();
    include 'conn.inc.php';
    $data = json_decode(file_get_contents("php://input"));
    $dbh = new PDO($conn,$user,$pass);
    $state = $dbh->prepare("SELECT * FROM Utente WHERE Email=:e LIMIT 1");
    $state->bindValue(':e',$data->email);
    if($state->execute())
    {
        if($state->rowCount()>0){
          echo 1;
        }
        else{
            $state2 = $dbh->prepare("SELECT * FROM Admin WHERE Email=:e LIMIT 1");
            $state2->bindValue(':e',$data->email);
            if($state2->execute())
            {
              if($state2->rowCount()>0)
                echo 1;
              else
                echo 0;
            }
        }
    }
    else
      	echo 0;
?>