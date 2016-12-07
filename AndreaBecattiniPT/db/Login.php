<?php
	session_start();	
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
	$dbh = new PDO($conn, $user, $pass);
	$stmt = $dbh->prepare("SELECT * FROM Admin WHERE Email=:e AND PasswCriptata=MD5(:p)");
	$stmt->bindValue(':e',$data->email_locale);
	$stmt->bindValue(':p',$data->password);
	if ($stmt->execute()) {
		if ($stmt->rowCount() > 0) {
			$result = $stmt->fetch();
			$_SESSION['userid']=$result['idAdmin'];
			$_SESSION['useremail']=$result['Email'];
			$_SESSION['username']=$result['Nome'];
			$_SESSION['io'] = 1;
			echo 1;
		}
		else{
			$stmt = $dbh->prepare("SELECT * FROM Utente WHERE Email=:e AND PasswCriptata=MD5(:p)");
			$stmt->bindValue(':e',$data->email_locale);
			$stmt->bindValue(':p',$data->password);
			if ($stmt->execute()) {
				if ($stmt->rowCount() > 0) {
				    $result = $stmt->fetch();
					$_SESSION['userid']=$result['idUtente'];
					$_SESSION['useremail']=$result['Email'];
					$_SESSION['username']=$result['Nome'];
					$_SESSION['io'] = 0;
					echo 1;
				}
				else {
					echo 0;
				}
			}
			else
				echo 0;
		}
	}
	else{
		echo 0;
	}
?>