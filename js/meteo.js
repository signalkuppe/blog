$(document).ready(function()
{
	
	if($( "#meteo-container" ).length > 0)
	{
		$('body').addClass('black');
		$( "#meteo-container" ).load( "/fragments/meteo.html" );
	}
	
})