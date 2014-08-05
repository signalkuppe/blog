$(document).ready(function()
{
	$('html,body').scrollTop(0);

	var coverdiv = $('.cover'),
	coverguide = $('.cover-guide'),
	covercaption = $('.cover-caption'),
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
		covercaption.hide();

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
			covercaption.hide();
		}
		

		// mostrala solo quando è caricata

		coverimg.onload = function () {
			// la cover è caricata
			coverdiv.css({'background-image':'url("'+cover+'")'});
			coverload.hide();
			coverguide.show();
			covercaption.show();		
		};			
		
	}

	if($('body').hasClass('has-cover'))
	{
		bg();

		function handleResize()
		{
			var h = $(window).height();
		    coverdiv.css({'height':h+'px'});
		    coverdiv.addClass('is-rendered');
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
	});

	$(document).keyup(function(e) {     
	    if(e.keyCode== 27) {
	        if($menucontainer.hasClass("is-open"))
	        {
	        	$menucontainer.removeClass('is-open')
	        	coverdiv.removeClass('is-under-menu');
	        } 
	    } 
	});

})