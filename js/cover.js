$(document).ready(function()
{
	$('html,body').scrollTop(0);

	var coverdiv = $('.cover'),
	coverguide = $('.cover-guide'),
	coverload = $('.loader,.loader-text'),
	coverlink = $('.cover-caption-link');

	// setta il testo della caption in home
	/* IMPROVE */

 	if(coverlink.text() == "")
 	{
 		coverlink.text($('#post').data('caption'));
 	}

	/* controlla che la cover sia caricata  */

	var bg = function () 
	{
		coverload.hide();

		// remove inline style
		coverdiv.css('background-image','');
		// trova la cover
		var cover = coverdiv.css('background-image').replace(/(url)|(")|(\()|(\))/g,'');
		// nascondila e nascondi la guida
		var coverimg = new Image();
		coverimg.src = cover;

		// se non è già caricata
		if(!coverimg.complete)
		{
			coverdiv.css('background-image','none');
			coverload.show();
			coverguide.hide();
		}
		
		// mostrala solo quando è caricata

		coverimg.onload = function (img) {
			// la cover è caricata
			coverdiv.css({'background-image':'url("'+cover+'")'});
			coverload.hide();
			coverguide.show();
		
		};						
		
	}

	if(coverdiv)
	{
		bg();

		function handleResize()
		{
			var h = $(window).height();
		    coverdiv.css({'height':h+'px'});
		    coverdiv.addClass('is-rendered');
		}

		function checkGuide ()
		{
			$menucontainer.hasClass('is-open') ? coverguide.hide() : coverguide.show();
		}

		handleResize();
		
		$(window).resize(function(){
		    handleResize();
		    bg();
		});		
	}





	var $menubutton = $("#menu-link");
	var $menucontainer = $("#menu-container");

	$menubutton.click(function()
	{
		$menucontainer.toggleClass("is-open");
		checkGuide();
	});

})