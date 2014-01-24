jQuery(function($) {

	$(".post-gallery-link").swipebox(
	{
		beforeOpen: function()
		{
			$.scrollUp.destroy();
		},
		afterClose: function()
		{
		    $.scrollUp({
		    	scrollText: ''
		    });
		} 
	});


});