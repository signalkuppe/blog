const map = document.getElementById('map');
const dislivello = document.getElementById('js-postGps-dislivello');
const distanza = document.getElementById('js-postGps-distanza');
let loaded;

function decimateArray(arr, passes = 1, fidelity = 2) {
    let tmpArr = arr.filter((_, index) => index % fidelity === 0);
    passes--;
    if (passes) {
        tmpArr = decimateArray(tmpArr, passes, fidelity);
    }
    return tmpArr;
}

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
    // mappe da thunderforest.com: 150.000 richieste al mese poi bisogna pagare, verificare
    const TILELAYER = L.tileLayer(
        'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f890f7037bd243ee9602a36c56fc6dc2',
        {
            attribution:
                '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zoom: 15,
        },
    );
    TILELAYER.addTo(mymap);
    new L.GPX(gpxUrl, {
        async: true,
        marker_options: {
            startIconUrl: '/img/markers/start.svg',
            endIconUrl: '/img/markers/end.svg',
            shadowUrl: null,
        },
    })
        .on('loaded', function (e) {
            mymap.fitBounds(e.target.getBounds());
            mapContainer.style.opacity = 1;
            const dislivelloValue = Math.round(e.target.get_elevation_gain());
            const distanzaValue = Math.round(e.target.get_distance() / 1000);
            animateValue(dislivello, 0, dislivelloValue, 1500);
            animateValue(distanza, 0, distanzaValue, 1500);
            loaded = true;
            const rawElevationData = e.target.get_elevation_data();
            console.log(rawElevationData);
            const elevationData = decimateArray(
                rawElevationData.map((data, i) => ({
                    y: data[1],
                    x: data[0].toFixed(1),
                })),
                1,
                10,
            );

            drawChart(elevationData);
        })
        .addTo(mymap);
};

const drawChart = function (elevationData) {
    const data = {
        labels: times(elevationData.length, (i) => elevationData[i].x),
        datasets: [
            {
                label: '',
                borderColor: getComputedStyle(
                    document.documentElement,
                ).getPropertyValue('--color-primary'),
                borderWidth: 1,
                borderJoinStyle: 'round',
                data: elevationData,
                line: {
                    borderWidth: 1,
                },
            },
        ],
    };
    const config = {
        type: 'line',
        data,
        options: {},
    };

    var myChart = new Chart(document.getElementById('postChart'), config);
};

document.addEventListener('post-section-reached', function (event) {
    // fires when map sections is intersecting viewport
    if (event.detail.section === 'mappa' && !loaded) {
        showMap();
    }
});
