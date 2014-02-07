$(document).ready(function()
{
	$('html,body').scrollTop(0);

	var coverdiv = $('.cover');
	var coverguide = $('.cover-guide');
	var coverload = $('.loader,.loader-text');

	/* controlla che la cover sia caricata  */

	coverload.hide();

	var bg = function () 
	{
		// non farlo nel post che arriva dalla home
		if(window.location.hash!="#start")
		{
			// trova la cover
			var cover = coverdiv.css('background-image').replace(/(url)|(")|(\()|(\))/g,'');
			// nascondila e nascondi la guida
			coverdiv.css({'background-image':'none'});
			coverload.show();
			coverguide.hide();
			var coverimg = new Image();
			// se c'è mostrala solo quando è caricata
			if(cover!='none') 
			{
				coverimg.src = cover;
				coverimg.onload = function (img) {
					// la cover è caricata
					coverdiv.css({'background-image':'url("'+img.target.src+'")'});
					coverload.hide();
					coverguide.show();
				};
			}
		}
	}

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



	var $menubutton = $("#menu-link");
	var $menucontainer = $("#menu-container");

	$menubutton.click(function()
	{
		$menucontainer.toggleClass("is-open");
		checkGuide();
	});

})