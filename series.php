<?php
	include("config.php");
	$rubrique = $_POST['r'];
	$temp = requete("SELECT * FROM serie WHERE id_rubrique_serie=(SELECT id_rubrique FROM rubrique WHERE class_rubrique='".$rubrique."')");
	$k = 0;
	while($data = mysql_fetch_array($temp))
	{
		if(!$k)
			echo $data['libelle_serie'].'<separator>';
		echo $data['libelle_serie']."::".$data['id_photo_serie'].";";
		$k++;
	}
?>