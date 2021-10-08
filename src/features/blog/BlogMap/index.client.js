/* Initialize map */
const tabs = document.getElementById('js-blogTabs');
const header = document.getElementById('js-header');
const mapDiv = document.getElementById('js-map');
const zoom = 7;
const lat = 45.7929;
const lng = 9.0;
const activeCategory = mapDiv.getAttribute('data-category');

function setMapHeight() {
    mapDiv.style.height = `${
        window.innerHeight -
        tabs.getBoundingClientRect().height -
        header.getBoundingClientRect().height
    }px`;
}

setMapHeight();
window.addEventListener('resize', debounce(setMapHeight, 350));

const showmap = function (markers) {
    const mymap = L.map('js-map', {
        renderer: L.canvas(),
        tap: false,
        attributionControl: false,
    });

    mymap.setView([lat, lng], zoom);
    // mappe da thunderforest.com: 150.000 richieste al mese poi bisogna pagare, verificare
    L.tileLayer(
        'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f890f7037bd243ee9602a36c56fc6dc2',
        {
            attribution:
                '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            apikey: 'f890f7037bd243ee9602a36c56fc6dc2',
            maxZoom: 22,
        },
    ).addTo(mymap);
    mymap.scrollWheelZoom.disable();
    mymap.addControl(new L.Control.Fullscreen());
    /* add markers */
    markers.forEach(function (marker) {
        const customIcon = L.divIcon({
            html: `
            <div class="map-marker">
                <img src="/icons/${marker.category}.svg" aria-label="${marker.title}" alt="" />
            </div>`,
        }); // use custom div for icons

        const popupHtml = `
            <a class="map-popup" href="${marker.permalink}" role="button" title="Leggi la relazione">
                <div class="map-popup-image">
                    <img src="${marker.cover.url}?w=300&h=300&fm=webp&fit=thumb&q=80&f=center" alt="${marker.cover.alt}" width="300" height="300" loading="lazy"/>
                </div>
                <div class="map-popup-info">
                     <div class="map-popup-date">
                        ${marker.dateShort}
                     </div>
                    <div class="map-popup-title">
                        ${marker.title}
                     </div>
                </div>
            </a>
        
        `;
        L.marker([marker.coordinates.lat, marker.coordinates.lon], {
            icon: customIcon,
        })
            .addTo(mymap)
            .bindPopup(popupHtml);
    });
};

fetch('/_data/map-points.json')
    .then((response) => response.json())
    .then((data) => {
        const filteredMarkers = data.filter((m) =>
            activeCategory ? m.category === activeCategory : true,
        );
        showmap(filteredMarkers);
    });
