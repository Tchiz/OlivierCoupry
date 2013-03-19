<?php
	include("configuration.php");
	
	function requete($query)
	{
		mysql_connect(DOMAIN, USER, MDP);
		mysql_select_db(BDD);
		
		$temp = mysql_query($query);
		/*
		mysql_close();
		*/
		return $temp;
	}
?>