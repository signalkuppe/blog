$(document).ready(function()
{
	// load fragment

	if($( "#meteo-container" ).length > 0)
	{
		$('body').addClass('black');

		$( "#meteo-container" ).load( "/meteo/meteo.html");
	}


	
})