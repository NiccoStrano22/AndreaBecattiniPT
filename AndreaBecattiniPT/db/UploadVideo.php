<?php
	session_start();
	$filename=str_replace(' ','_',$_FILES['file']['name']);
	$newfilename=$filename;
	$path_parts = pathinfo($filename);
	while (file_exists('../images/'.$newfilename))
		$newfilename=$path_parts['filename'].rand(0,10000).'.'.$path_parts['extension'];
	$destination = '../video/' . $newfilename;
	if (move_uploaded_file( $_FILES['file']['tmp_name'] , $destination ))
		echo 'video/'.$newfilename;

?>