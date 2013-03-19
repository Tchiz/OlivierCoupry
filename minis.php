<?php
	include("config.php");
	$serie = $_POST['s'];
	$page = $_POST['p'];
	$pas = 6;
	$index = $pas * $page;
	
	$temp = requete("SELECT * FROM rubrique WHERE id_rubrique=(SELECT id_rubrique_serie FROM serie WHERE libelle_serie='".$serie."')");
	while($data = mysql_fetch_array($temp))
	{
		echo $data['chemin_rubrique'].'<separator>';
	}
	
	$temp = requete("SELECT * FROM serie WHERE libelle_serie='".$serie."'");
	while($data = mysql_fetch_array($temp))
	{
		echo $data['chemin_serie'].'<separator>';
		echo $data['description_serie'].'<separator>';
	}
	
	$temp = requete("SELECT * FROM photo WHERE id_serie_photo=(SELECT id_serie FROM serie WHERE libelle_serie='".$serie."') LIMIT ".$index.",".$pas);
	while($data = mysql_fetch_array($temp))
	{
		echo $data['chemin_photo'].'::';
	}
?>