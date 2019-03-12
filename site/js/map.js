(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    /* Initialize map */
    var zoom = 8
    var lat = 45.7929
    var lng =  9.0000
    var mqp = window.matchMedia("(orientation: portrait)")
    if(mqp.matches) { 
      zoom = 7
    }
    var mymap = L.map('map').setView([lat, lng], zoom);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2lnbmFsa3VwcGUiLCJhIjoiY2o4aXQyOGtiMTMxaTJ3bzFjazk3cTlzdSJ9.mg7mk_rts2i6Rq8z0ZbGWw', 
    {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    mymap.scrollWheelZoom.disable()
    /* add markers */
    markers.forEach(function(marker){
        var customIcon = L.divIcon({className: 'c-map-marker', html:'<img title="'+marker.title+'" src="'+marker.marker+'" />'}), // use custom div for icons
            markerHtml = '<a href="'+marker.link+'" class="c-map-link" title="Leggi il post"><div class="c-map-popup">';
            markerHtml += '<img src="'+marker.cover+'" />'
            markerHtml += '<div class="c-map-info">'
            markerHtml += '<div class="c-map-title">' + marker.title + '</div>'
            markerHtml += '<div class="c-map-date">'
            markerHtml += marker.date
            markerHtml += '</div>'
            markerHtml += '<span class="c-map-readmore c-button c-button--small" title="Leggi il post">Leggi</span>'
            markerHtml += '</div>'
            markerHtml += '</div>'
        L.marker([marker.lat, marker.lng],{icon: customIcon})
            .addTo(mymap)
            .bindPopup(markerHtml);
    })
  })
})()