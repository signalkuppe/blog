$(document).ready(function()
{
	enquire.register("screen and (min-width:600px)", {
	    match : function() 
	    {
	    	$(".post-title").unorphanize();
	    },                           
	    unmatch : function()
	    {
	    	//
	    }  
	      
	});
})