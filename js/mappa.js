$(document).ready(function()
{
	// mappa

	if($( "#mappa" ).length > 0)
	{
		var cords = $('.archive-map-data').text().split('|'),
		points = [];
	
		cords.forEach(function (c)
		{
			points.push(
			{
				title:c.split('+')[2],
				date: c.split('+')[1],
				lat: c.split('+')[0].split(',')[0].replace(/\s/g,''),
				lng: c.split('+')[0].split(',')[1].replace(/\s/g,''),
				url: c.split('+')[3].replace(/\s/g,'')
			})
		})

		var map = new GMaps
		({
	        div: '#mappa',
	        lat: 45.5929,
	        lng: 9.88252,
	        zoom: 8,
	        scrollwheel: false,
	        mapTypeId: 'satellite'
      	});
		
      	points.forEach(function (p)
      	{	
			map.addMarker({
				lat: p.lat,
			  	lng: p.lng,
				infoWindow: {
				  content: '<span>'+p.date+'</span><br /><strong>'+p.title+'</strong><br /><a href="'+p.url+'" />Vai al post</a>'
				}
			});
      	})


	}

})