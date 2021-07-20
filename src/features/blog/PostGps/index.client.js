const map = document.getElementById('map');
const TILELAYER = L.tileLayer(
    'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f890f7037bd243ee9602a36c56fc6dc2',
    {
        attribution:
            '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        zoom: 15,
    },
);

const showMap = function () {
    const gpxUrl = map.getAttribute('data-gpx');
    let mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'map');
    mapContainer.style.position = 'absolute';
    mapContainer.style.left = 0;
    mapContainer.style.top = 0;
    mapContainer.style.zIndex = 1001; // over caption
    mapContainer.style.opacity = 0;
    let mymap = L.map('map', {
        renderer: L.canvas(),
        attributionControl: false,
        gestureHandling: true, // depends on https://github.com/elmarquis/Leaflet.GestureHandling
    });
    mymap.addControl(new L.Control.Fullscreen());
    mymap.on('fullscreenchange', function () {
        var infoBoxGpx = document.getElementById('js-infoBoxGpx');
        if (mymap.isFullscreen()) {
            infoBoxGpx.style.display = 'none';
        } else {
            infoBoxGpx.style.display = 'block';
        }
    });
    // mappe da thunderforest.com: 150.000 richieste al mese poi bisogna pagare, verificare
    TILELAYER.addTo(mymap);

    new L.GPX(gpxUrl, {
        async: true,
        marker_options: {
            startIconUrl: '/img/marker.svg',
            endIconUrl: '/img/marker.svg',
        },
    })
        .on('loaded', function (e) {
            mymap.fitBounds(e.target.getBounds());
            mapContainer.style.opacity = 1;
        })
        .addTo(mymap);
};

showMap();
