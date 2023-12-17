const map = document.getElementById('js-map');
const loaderDiv = document.getElementById('js-map-loader');
const minEl = document.getElementById('js-postGps-min');
const maxEl = document.getElementById('js-postGps-max');
const gainEl = document.getElementById('js-postGps-gain');
const distanceEl = document.getElementById('js-postGps-distance');
const gpxDownload = document.querySelector('.js-gps-download-gpx');
const kmlDownload = document.querySelector('.js-gps-download-kml');
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
    const correctedElevationGain = map.getAttribute('data-elevation-gain');
    const correctedDistance = map.getAttribute('data-distance');
    const correctedMimimumAltitude = map.getAttribute('data-minimum-altitude');
    const correctedMaximumAltitude = map.getAttribute('data-maximum-altitude');
    let mymap;
    if (!mymap) {
        mymap = L.map('js-map', {
            renderer: L.canvas(),
            attributionControl: false,
            scrollWheelZoom: false,
        });
    }

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

    loaderDiv.style.display = 'none';

    new L.GPX(gpxUrl, {
        async: true,
        marker_options: {
            startIconUrl: '/img/markers/start.svg',
            endIconUrl: '/img/markers/end.svg',
            shadowUrl: null,
        },
        polyline_options: {
            color: getCssVar('--color-map-track'),
            opacity: 1,
            weight: 3,
            lineCap: 'round',
        },
    })
        .on('loaded', function (e) {
            mymap.fitBounds(e.target.getBounds());
            const gain = Math.round(
                correctedElevationGain || e.target.get_elevation_gain(),
            );
            const distance = Math.round(
                correctedDistance || e.target.get_distance() / 1000,
            );
            const min =
                correctedMimimumAltitude ||
                Math.round(e.target.get_elevation_min());
            const max =
                correctedMaximumAltitude ||
                Math.round(e.target.get_elevation_max());
            const rawElevationData = e.target.get_elevation_data();
            const elevationData = decimateArray(
                rawElevationData.map((data) => ({
                    y: data[1],
                    x: data[0].toFixed(1),
                })),
                1,
                20,
            );

            setTimeout(() => {
                animateValue(gainEl, 0, gain, 1500);
                animateValue(distanceEl, 0, distance, 1500);
                animateValue(minEl, 0, min, 1500);
                animateValue(maxEl, 0, max, 1500);
                loaded = true;
                drawChart(elevationData);
            }, 1000);
        })
        .addTo(mymap);
};

const drawChart = function (elevationData) {
    const data = {
        labels: times(elevationData.length, (i) => elevationData[i].x),
        datasets: [
            {
                label: '',
                borderColor: getCssVar('--color-primary'),
                borderWidth: 4,
                data: elevationData,
                pointRadius: 0,
                pointBorderWidth: 0,
                spanGaps: true,
            },
        ],
    };

    const config = {
        type: 'line',
        data,
        options: {
            responsive: true,
            plugins: {
                legend: false,
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: '(Km)',
                        color: getCssVar('--color-text-dark-accent'),
                    },

                    max: Math.floor(elevationData[elevationData.length - 1].x),
                    min: Math.floor(elevationData[0].x),
                    grid: {
                        color: getCssVar('--color-background-light'),
                    },
                },
                y: {
                    type: 'linear',
                    grid: {
                        color: getCssVar('--color-background-light'),
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value) {
                            return `${value}m`;
                        },
                    },
                },
            },
        },
    };

    new Chart(document.getElementById('postChart'), config);
};

document.addEventListener('post-section-reached', function (event) {
    // fires when map sections is intersecting viewport
    if (event.detail.section === 'mappa' && !loaded) {
        showMap();
    }
});

function artificialDelay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

async function downloadAndCompress(file, filename, type) {
    const remoteFileUrl = file;
    const name = `${filename}.${type}`;

    try {
        await artificialDelay(1000);
        const response = await fetch(remoteFileUrl);
        const fileData = await response.blob();
        const fileName = `${filename}.zip`;
        const zip = new JSZip();
        zip.file(name, fileData);
        const zipContent = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipContent);

        const link = document.createElement('a');
        link.href = zipUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(zipUrl);
    } catch (error) {
        console.error(
            'Errore durante il download o la compressione del file:',
            error,
        );
    }
}

if (gpxDownload) {
    gpxDownload.addEventListener('click', async function (e) {
        e.preventDefault();
        gpxDownload.querySelector('.js-download-icon').style.display = 'none';
        gpxDownload.querySelector('.js-loading-icon').style.display =
            'inline-flex';
        await downloadAndCompress(
            gpxDownload.getAttribute('href'),
            gpxDownload.getAttribute('data-slug').split('/').pop(),
            'gpx',
        );

        gpxDownload.querySelector('.js-download-icon').style.display =
            'inline-flex';
        gpxDownload.querySelector('.js-loading-icon').style.display = 'none';
    });
}

if (kmlDownload) {
    kmlDownload.addEventListener('click', async function (e) {
        e.preventDefault();
        kmlDownload.querySelector('.js-download-icon').style.display = 'none';
        kmlDownload.querySelector('.js-loading-icon').style.display =
            'inline-flex';
        await downloadAndCompress(
            kmlDownload.getAttribute('href'),
            gpxDownload.getAttribute('data-slug').split('/').pop(),
            'kml',
        );
        kmlDownload.querySelector('.js-download-icon').style.display =
            'inline-flex';
        kmlDownload.querySelector('.js-loading-icon').style.display = 'none';
    });
}
