$(document).ready(function()
{

	var $links = $('.post-gallery-list');
	var $activate = $('.post-gallery-mobile-link');
	// non caricare le immagini su device piccole
	$links.hide();

	var _showImages = function ()
	{
		$links.show();
		$('[data-src]').each(function()
		{
			$(this).attr(
			{
				'src': $(this).data('src')
			})
		})		
	}

	$('#eye').hide();
	var _mostraGallery = function (button)
	{
		_showImages();
		button.find('span').text('Nascondi le foto');
		$('#camera').hide();
		$('#eye').show();

	}
	var _nascondiGallery = function (button)
	{
		$links.hide();
		$('#eye').hide();
		$('#camera').show();
		button.find('span').text('Guarda le foto');

	}

	$activate.click(function(e)
	{
		e.preventDefault();
 		if($(this).hasClass('open'))
 		{
 			_nascondiGallery($(this));

 		}
 		else
 		{
 			_mostraGallery($(this));
 			$links.addClass('post-gallery-list--mobile');
 		}
 		$(this).toggleClass("open");
	})


	enquire.register("screen and (min-width:1024px)", {

		// mostra le immagini 
	    match : function() 
	    {
	    	$activate.hide();

	    	// non caricarle all'inizio
	    	$(window).scroll(function(){
	    		if($(window).scrollTop() > $('.cover').height()) {
					_mostraGallery($activate);
					$links.removeClass('post-gallery-list--mobile');
	    		}
	    	});

	    },      
	     
	    // nascondi sul resize on mobile                          
	    unmatch : function()
	    {
	    	$activate.show();
			_nascondiGallery($activate);
			$links.addClass('post-gallery-list--mobile');
	    }  

	      
	});

	
})