<?php
	include("config.php");
	$temp = requete("SELECT * FROM rubrique");
	
	echo '<td class="Accueil" onClick="majContenu(\'Accueil\');">Accueil</td>';
	
	while($data = mysql_fetch_array($temp))
	{
		echo '
			<td class="'.$data['class_rubrique'].'" onClick="majContenu(\''.$data['class_rubrique'].'\', \''.$data['libelle_rubrique'].'\');">'.$data['libelle_rubrique'].'</td>
		';
	}	
?>