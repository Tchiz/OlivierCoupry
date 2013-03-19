var page = 0;
var pas = 6;

function getRubriqueId()
{
	return $("h1 .subTitle").html();
}

function getSerieId()
{
	var serie1 = 0;
	var serie2 = 0;
	var serie3 = 0;
	serie1 = parseFloat($("#Body #Corps .contenu #Animation .serie1").css("width").substr(0, 3));
	serie2 = parseFloat($("#Body #Corps .contenu #Animation .serie2").css("width").substr(0, 3));
	serie3 = parseFloat($("#Body #Corps .contenu #Animation .serie3").css("width").substr(0, 3));
	
	// alert("getSerieId : " + serie1 + ";" + serie2 + ";" + serie3 );
	if( serie1 > serie2 && serie1 > serie3 )
	{
		return "1";
	}
	else if( serie2 > serie1 && serie2 > serie3 )
	{
		return "2";
	}
	else
	{
		return "3";
	}
}

function accueil()
{
	$.ajax({
		url: "rubriques.php",
		success: function(data){
			$("#Footer #MenuCoupry table tr").html(data);
		}
	});
	$("#Body #Corps .contenu #ImgAccueil .left").fadeIn(800, function(){
		$("#Body #Corps .contenu #ImgAccueil .middle").fadeIn(700, function(){
			$("#Body #Corps .contenu #ImgAccueil .right").fadeIn(700);
		});
	});
}
function slideMinis(rubrique, id, _page, direction1, direction2)
{
	$.ajax({
		type: "POST",
		url: "selectS.php",
		data: "r=" + rubrique + "&s=" + id,
		success: function(data){
			serie = data;
			$.ajax({
				type: "POST",
				url: "verifminis.php",
				data: "s=" + serie,
				success: function(data){
					nbPage = parseInt(parseFloat(data) / pas);
					if(_page <= nbPage - 1 && _page >= 0)
					{
						page = _page;
						k = 0;
						$("#Animation .mini_1, #Animation .mini_2").hide("slide", { direction : direction1 }, 750,
							function(){
								if(k == 0)
								{
									majMinis(serie, page);
									$("#Animation .mini_1, #Animation .mini_2").show("slide", { direction : direction2 }, 750);
								}
								k++;
							}
						);
					}
				}
			});
		}
	});
}

function slideR()
{
	slideMinis(getRubriqueId(), getSerieId(), page+1, "left", "right");
}

function slideL()
{
	slideMinis(getRubriqueId(), getSerieId(), page-1, "right", "left");
}
	
function galerie()
{
	$("#Corps .contenu .introduction").css("display", "block");
	
	/*
	$("#Body #Corps .contenu #Animation #minis .mini").mouseover(function(){
		var bloc = $(this).attr("id");
		// $("#" + bloc + " .infoClick").fadeIn("slow");
		//$("#Body #Corps .contenu #Animation #minis #" + bloc + " .infoClick").css("display", "block");
	});
	
	$(".mini").mouseout(function(){
		var bloc = $(this).attr("id");
		// $("#" + bloc + " .infoClick").fadeOut();
		//$("#" + bloc + " .infoClick").css("display", "none");		
	});
	*/

}
function diminuer(){
	$("#Footer #MenuCoupry table").animate({ "width" : "831px" }, "slow");
	$("#Footer #MenuCoupry #LineMenu").animate({ "width" : "90px" }, "slow");
}
function augmenter(){
	$("#Footer #MenuCoupry table").animate({ "width" : "731px" }, "slow");
	$("#Footer #MenuCoupry #LineMenu").animate({ "width" : "190px" }, "slow");
}

function majMenu(choix){
	$.ajax({
		url: "rubriques.php",
		success: function(data){
			$("#Footer #MenuCoupry table tr").html(data);
			if(choix != "Acceuil")
			{
				$.ajax({
					type: "POST",
					url: "series.php",
					data: "r=" + choix,
					success: function(data){
						_html = "<div class='subMenu'> | ";
						data = data.split('<separator>');
						data = data[1].split(';');
						for(i=0; i < data.length; i++)
						{
							donnees = data[i].split(':');
							_html += "<div class='items'> " + donnees[0]+ " </div>";
						}
						_html += "</div>";
						$("." + choix).append(_html);
					}
				});
			}
		}
	});
}

function majPagination()
{

	rubrique = getRubriqueId();
	id = getSerieId();
	// alert("rubrique" + rubrique);
	// alert("serieId" + id);
	$.ajax
	(
		{
			type: "POST",
			url: "selectS.php",
			data: "r=" + rubrique + "&s=" + id,
			success: function(data)
			{
				serie = data;
				$.ajax
				(
					{
						type: "POST",
						url: "verifminis.php",
						data: "s=" + serie,
						success: function(data)
						{
							$(".contenu .pages").html("");
							nbPage = parseInt(parseFloat(data) / pas);
							for(var i = 0; i < nbPage; ++i)
							{
								$(".contenu .pages").html($(".contenu .pages").html() + "<div id='" + i + "' class='item' onClick='slideMinis(getRubriqueId(), getSerieId(), "+i+", \"left\", \"right\");'>" + (i+1) + "</div>");
							}
						}
					}
				)
			}
		}
	);	
}

function majMinis(serie, page_){
	$("#Body #Corps .contenu #Animation #minis .mini_1, #Body #Corps .contenu #Animation #minis .mini_2").html("");
	$.ajax({
		type: "POST",
		url: "minis.php",
		data: "s=" + serie + "&p=" + page,
		success: function(data)
		{
			data = data.split("<separator>");
			rubrique = data[0];
			serie = data[1];
			donnees = data[2].split("::");
			for(i = 0; i < donnees.length - 1; i++)
			{
				if( i < 3)
					$("#Body #Corps .contenu #Animation #minis .mini_1").append('<div id="mini'+ (i+1) +'" class="mini" onClick="lightBoxIn(\'' + rubrique + serie + donnees[i] + '.jpg\');"></div>');
				else
					$("#Body #Corps .contenu #Animation #minis .mini_2").append('<div id="mini'+ (i+1) +'" class="mini" onClick="lightBoxIn(\'' + rubrique + serie + donnees[i] + '.jpg\');"></div>');
				$("#Body #Corps .contenu #Animation #minis #mini"+ (i+1)).css("background", "url('./photos/"+ rubrique + serie + "mini" + donnees[i] + ".jpg')");
			}
			majPagination();
			galerie();
		}
	});
}
function majContenu(choix){
	$("h1 .subTitle").html(choix);
//	majMenu(choix); modifié par Jonathan pour empêcher l'affichage des sous titres dans le menu en bas
	if(choix == "Accueil")
	{
		$("h1 .subTitle").html("");
		$.ajax({
			url: "first.html",
			error: function(data, error){
				alert(data.statusText);
			},
			success: function(data){
				$("#Body #Corps .contenu").html(data);
				accueil();
			}
		});
	}
	else if( choix == "Contacts")
	{
		// a faire
	}
	else
	{
		$.ajax({
			url: "rubrique.html",
			error: function(data, error){
				alert(data.statusText);
			},
			success: function(data){
				$("#Body #Corps .contenu").html(data);
				$.ajax({
					type: "POST",
					url: "series.php",
					data: "r=" + choix,
					success: function(data){
						data = data.split('<separator>');
						firstSerie = data[0];
						data = data[1].split(';');
						for(i = 0; i < data.length - 1; i++)
						{
							donnees = data[i].split('::');
							$("#Body #Corps .contenu #Animation #"+ (i+1) + " h4").html(donnees[0]);
							$("#Body #Corps .contenu #Animation #"+ (i+1)).css("background", "url('./presentation/" + donnees[1] + ".jpg') no-repeat transparent");
						}
						page = 0;
						majMinis(donnees[0], page);
					}
				});
			}
		});
	}
}

function lightBoxIn(img){
	$("#blocNoir").css("display", "block");
	$(".image").fadeIn(1500);
	$(".image").html("<img src='photos/"+img+"' onClick='lightBoxOut()'/>");
}

function lightBoxOut(){
	$(".image").css("display", "none");
	$("#blocNoir").css("display", "none");
	$("#vignette").css("display", "block");
}

function cacher(obj, before){
	$(obj).animate({"width": before}, "slow");					
}
	
function montrer(obj, before, after){
	id = $(obj).attr("id");
	rubrique = $("h1 .subTitle").html();
	$.ajax({
		type: "POST",
		url: "selectS.php",
		data: "r=" + rubrique + "&s=" + id,
		success: function(data){
			page = 0;
			$("#Corps .contenu  .introduction").css("display", "block");	
			$("#Corps .contenu  .clique").css("display", "block");
			$(obj).animate({"width": after}, "slow", function(){
				majMinis(data, page);
			});
		}
	});
}

function clicked(obj, before, after){
	rub = $(obj).attr("id");
	cacher($("#Body #Corps .contenu #Animation .serie1, #Body #Corps .contenu #Animation .serie2, #Body #Corps .contenu #Animation .serie3"), before);
	if($(obj).css("width") == after)
	{
		choix = new Array();
		k = 0;
		for(i=1; i <= 3; i++)
		{
			if(i != $(obj).attr("id"))
			{
				choix[k] = i;
				k++;
			}
		}

		$("#Body #Corps .contenu #Animation #" + choix[0]).animate(
			{"width": 0}, 
			"slow",
			function(){
				$("#Body #Corps .contenu #Animation #" + choix[0] + " .introduction").hide();
				$("#Body #Corps .contenu #Animation #" + choix[1] + " .introduction").hide();
				$("#Body #Corps .contenu #Animation #" + choix[0] + " .clique").hide();
				$("#Body #Corps .contenu #Animation #" + choix[1] + " .clique").hide();
				$("#Body #Corps .contenu #Animation #" + choix[1]).animate({"width" : 0}, "slow");
				$("#Body #Corps .contenu #Animation #minis").fadeIn(3000);
			}
		);
		$("h3").html("S<span class='red'>&eacute;</span>rie " + $("." + $(obj).attr("class") + " .introduction .cont h4").html());
	}
	else
	{
		montrer($(obj), before, after);
		$("#Body #Corps .contenu #Animation #minis").hide();
		$("h3").html("");
	}  			
}

$(document).ready(function(){
	
	// Gestion Image d'accueil
	accueil();
	// Menu Principal
	/*
	$("#Footer #MenuCoupry img").click(function(){
		augmenter();
	});
	$("#Footer #MenuCoupry table").click(function(){
		augmenter();
		diminuer();
	});*/ //modifié par Jonathan pour enlever l'effet de piston
	
	$("#Footer #MenuCoupry").mouseout(function(){
		$("#Footer #MenuCoupry #BlocMenu").hide();
	});
	
	$("#Footer #MenuCoupry").mousemove(function(e){
		$("#Footer #MenuCoupry #BlocMenu").css("left", e.pageX - 50);
		$("#Footer #MenuCoupry #BlocMenu").show();
	});

	// Galerie
	$("#Body #Corps .contenu #Animation .serie1").click(function(){clicked(this, "157px", "441px");});
	$("#Body #Corps .contenu  #Animation .serie2").click(function(){clicked(this, "157px", "441px");});
	$("#Body #Corps .contenu  #Animation .serie3").click(function(){clicked(this, "100px", "555px");});
	$("#Body #Corps .contenu  #Animation .serie3 .introduction").css("display", "block");
});