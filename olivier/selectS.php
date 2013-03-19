<?php
	include('config.php');
	
	$rubrique = $_POST['r'];
	$serie = $_POST['s'];
	
	$temp = requete("SELECT * FROM serie WHERE id_rubrique_serie=(SELECT id_rubrique FROM rubrique WHERE libelle_rubrique='".$rubrique."')");
	$k = 0;
	while($data = mysql_fetch_array($temp))
	{
		$k++;
		if($k == $serie)
			echo $data['libelle_serie'];
	}
?>