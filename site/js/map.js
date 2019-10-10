(function () {
  /* Initialize map */
  
  var zoom = 8
  var lat = 45.7929
  var lng =  9.0000
  var mymap = L.map('map',{ 
    renderer: L.canvas()
  })
  var mapdiv = document.getElementById('map')
  mymap.setView([lat, lng], zoom)
  // mappe da thunderforest.com: 150.000 richieste al mese poi bisogna pagare, verificare
  L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f890f7037bd243ee9602a36c56fc6dc2', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: 'f890f7037bd243ee9602a36c56fc6dc2',
    maxZoom: 22
  }).addTo(mymap)
  mymap.scrollWheelZoom.disable()
  /* add markers */
  markers.forEach(function(marker){
      var customIcon = L.divIcon({className: 'c-map-marker', html:'<img title="'+marker.title+'" src="/img/marker.svg" />'}), // use custom div for icons
          markerHtml = '<a href="'+marker.link+'" class="c-map-link" title="Leggi il post"><div class="c-map-popup">';
          markerHtml += '<img src="'+marker.cover+'" />'
          markerHtml += '<div class="c-map-info">'
          markerHtml += '<div class="c-map-date">'
          markerHtml += marker.date
          markerHtml += '</div>'
          markerHtml += '<div class="c-map-title">' + marker.title + '</div>'
          markerHtml += '</div>'
          markerHtml += '</div>'
      L.marker([marker.lat, marker.lng],{icon: customIcon})
          .addTo(mymap)
          .bindPopup(markerHtml);
  })
  var myLazyLoad = new LazyLoad()
  myLazyLoad.update() // trigger lazyload images for dynamic content
})()