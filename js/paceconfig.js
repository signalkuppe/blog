paceOptions = {
  elements: {
    selectors: ['.cover']
  }
}


function finish ()
{
	$(document).ready(function()
	{
		
		setTimeout(function() {
		      console.log("pagina caricata")
		}, 500);
		
	})
	
}

Pace.on('done', finish);