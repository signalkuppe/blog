$(document).ready(function()
{
	// load fragment

	if($( "#meteo-container" ).length > 0)
	{
		$( "#meteo-container" ).load( "/meteo/meteo.html");
	}

})