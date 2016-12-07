<?php
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
	$dbh = new PDO($conn, $user, $pass);
	$stmt = $dbh->prepare("SELECT Utente.Image as Immagine, Utente.Nome as Nome, Utente.Cognome as Cognome, Commenti.Data as Data, Commenti.Descrizione as Descrizione, Commenti.Ora as Ora
							FROM Utente INNER JOIN Commenti ON Utente.idUtente=Commenti.Utente_idUtente
										INNER JOIN CV ON Commenti.idCommenti = CV.Commenti_idCommenti
							WHERE CV.Video_idVideo=:id
							ORDER BY Commenti.Data DESC, Commenti.Ora DESC");
	$stmt->bindValue(':id',$data->id);
	if ($stmt->execute())
	    echo json_encode($stmt->fetchAll());
?>