$(document).ready(function()
{
	var $links = $('.post-gallery-link');
	var $activate = $('.post-gallery-mobile-link');

	var _showImages = function ()
	{
		$('[data-src]').each(function()
		{
			$(this).attr(
			{
				'src': $(this).data('src')
			})
		})		
	}

	var _linkHide = function ()
	{
		$links.show();
	    $activate.hide();
	}

	var _linkShow = function ()
	{
		$links.hide();
	    $activate.show();
	}

	enquire.register("screen and (min-width:64em)", {


	    match : function() 
	    {
	    	console.log("match")
			_linkHide();
			_showImages();
	    },      
	                                
	    unmatch : function()
	    {
	    	console.log("unmatch")
			_linkShow();
			$activate.click(function()
			{
				_showImages();
				return false;
			})
	    	


	    }  

	      
	});	
})