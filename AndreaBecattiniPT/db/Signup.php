<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
	$dbh = new PDO($conn, $user, $pass);
	$query = $dbh->prepare("INSERT INTO Utente (Nome,Cognome,Email,Password,Image,PasswCriptata,Registrazione) VALUES (:locale,:cog,:email,:password,:img,MD5(:crip),:date)");
	$query->bindValue(':locale',$data->nome_locale);
	$query->bindValue(':cog',$data->civ_locale);
	$query->bindValue(':email',$data->email_locale);
	$query->bindValue(':password',$data->pass_locale);
    $query->bindValue(':crip',$data->pass_locale);
    $query->bindValue(':date', $data->date);
	if($data->img == null){
        $path = 'myIMG/account.jpg';
		$query->bindValue(':img',$path);
	}
    else
		$query->bindValue(':img',$data->img);
	if($query->execute())
	{
		$_SESSION['userid']=$dbh->lastInsertId();
		$_SESSION['useremail']=$data->email_locale;
		$_SESSION['username']=$data->nome_locale;
		$_SESSION['io']=0;
		echo 1;
	}
	else{
	    echo 0;
	}
?>

