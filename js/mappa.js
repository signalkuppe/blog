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
		});



		function _drawMap(z,l)
		{
			var map = new GMaps
			({
		        div: '#mappa',
		        lat: l,
		        lng: 8.28252,
		        zoom: z,
		        scrollwheel: false,
		        panControl: false,
		        mapTypeControl: false,
		        mapTypeId: 'satellite',
			    zoomControlOptions: {
			        style: google.maps.ZoomControlStyle.DEFAULT,
			        position: google.maps.ControlPosition.TOP_LEFT
			    }
	      	});
			
	      	points.forEach(function (p)
	      	{	
				map.addMarker({
					lat: p.lat,
				  	lng: p.lng,
				  	icon: '/img/marker.png',
					infoWindow: {
					  content: '<div class="archive-map-window-left"><a href="'+p.url+'" /><img src="/img/covers/'+p.date.replace(/\//g,'')+'/cover.jpg" /></a></div><div class="archive-map-window-right"><span>'+p.date+'</span><br /><p><strong>'+p.title+'</strong></p><a class="archive-map-link" href="'+p.url+'" />Leggi l\'articolo</a></div>'
					}
				});
	      	});

	      	$('#mappa').append('<div class="archive-map-buttons"><a href="/" class="btn"><svg class="icon icon-home" viewBox="0 0 32 32"><use xlink:href="#icon-home"></use></svg>Torna alla homepage</a><a id="archive-years" href="#years"><svg class="icon icon-arrow-down" viewBox="0 0 32 32"><use xlink:href="#icon-arrow-down"></use></svg>Archivio annuale</a></div>')
			$('#archive-years').on('click', function() {
				$.smoothScroll({
			  		scrollTarget: '#years'
				});
				return false;
			});

		}


		enquire.register("screen and (max-width:767px)", {
			// cambia lo zoom
		    match : function() 
		    {
		    	_drawMap(6,45.7929);
		    },                           
		    unmatch : function()
		    {
		    	_drawMap(8,45.7929);
		    }  
		      
		});

		enquire.register("screen and (min-width:768px)", {
			// cambia lo zoom
		    match : function() 
		    {
		    	_drawMap(8,45.7929);
		    },                              
		    unmatch : function()
		    {
		    	_drawMap(6,45.7929);
		    }  
		      
		});

		function handleResize()
		{
			var h = $(window).height();
		    $('.archive-map').css({'height':h+'px'});
		}

		handleResize();
		
		$(window).resize(function(){
		    handleResize();
		});


	}

})