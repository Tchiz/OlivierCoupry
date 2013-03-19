<?php
	include("config.php");
	$serie = $_POST['s'];
	$temp = requete("SELECT count(*) as counter FROM photo WHERE id_serie_photo=(SELECT id_serie FROM serie WHERE libelle_serie='".$serie."')");
	while($data = mysql_fetch_array($temp))
	{
		echo $data['counter'];
	}
?>