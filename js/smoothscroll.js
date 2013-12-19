$(document).ready(function()
{
	$('a').smoothScroll();
	// scroll tha page after a small delay when arriving from the front page
	if(window.location.hash=="#start")
	{
		window.scrollTo(0, 0);
		setTimeout(function() {
 			$.smoothScroll(
			{
	      		scrollElement: null,
	      		scrollTarget: '#post',
	      		speed: 700
	    	});     
		}, 500);


	}
})




