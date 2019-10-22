
(function () {
  var iconShow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.636 51.636"><path d="M51.353.914a.999.999 0 0 0-1.135-.213L.583 23.481a1 1 0 0 0 .252 1.895l22.263 3.731 2.545 21.038a1.002 1.002 0 0 0 1.889.324l24-48.415a1 1 0 0 0-.179-1.14z"/></svg>'
  var iconClose = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.997 511.997"><path d="M508.872 478.706L33.292 3.124c-4.167-4.165-10.919-4.165-15.086 0L3.125 18.206c-4.167 4.165-4.167 10.919 0 15.085l88.207 88.208C49.216 154.827 17.378 200.261.509 252.739a10.722 10.722 0 0 0 0 6.521C36.79 372.156 139.467 448 255.999 448c45.581 0 89.41-11.549 128.546-33.288l94.161 94.161c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.166-4.165 4.166-10.919-.001-15.085zm-252.873-73.373c-82.344 0-149.333-66.99-149.333-149.333 0-32.414 10.659-63.681 29.859-89.309l46.375 46.376c-7.676 12.887-12.234 27.445-12.234 42.932 0 47.052 38.281 85.333 85.333 85.333 15.487 0 30.046-4.559 42.932-12.234l46.375 46.375c-25.628 19.201-56.893 29.86-89.307 29.86zM246.999 177.281a10.678 10.678 0 0 0 2.292 11.677l73.75 73.75A10.664 10.664 0 0 0 334.718 265c4-1.688 6.583-5.615 6.531-9.958-.531-46.74-37.552-83.76-84.292-84.292-4.25.458-8.271 2.531-9.958 6.531z"/><path d="M179.613 119.281c3.198 3.208 8.083 4.021 12.146 2.083 20.375-9.75 41.99-14.698 64.24-14.698 82.344 0 149.333 66.99 149.333 149.333 0 22.25-4.948 43.865-14.698 64.24a10.674 10.674 0 0 0 2.083 12.146l36.969 36.969c2 2 4.708 3.125 7.542 3.125h.021a10.72 10.72 0 0 0 7.563-3.156c30.313-30.615 53.375-68.677 66.677-110.063a10.722 10.722 0 0 0 0-6.521c-36.281-112.896-138.958-188.74-255.49-188.74-31.979 0-63.406 5.687-93.417 16.917a10.665 10.665 0 0 0-6.688 7.729 10.669 10.669 0 0 0 2.885 9.802l20.834 20.834z"/></svg>'
  var coverContainer = document.querySelector('.c-post-cover')
  var buttonContainer = document.getElementById('js-gpxButtonContainer')
  var gpxUrl = document.getElementById('js-gpxButton').getAttribute('href')
  var TILELAYER = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f890f7037bd243ee9602a36c56fc6dc2', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    zoom: 15
  })
  var mapRendered = false
  var showMap = function () {
    var showButton = document.getElementById('js-showButton')
    var infoBoxGpx = document.getElementById('js-infoBoxGpx')
    if (!mapRendered) {
      showButton.innerHTML = iconShow + ' Carico la traccia...'
      var mapContainer = document.createElement('div')
      mapContainer.setAttribute('id', 'map')
      mapContainer.style.height = coverContainer.getBoundingClientRect().height + 'px'
      mapContainer.style.width = coverContainer.getBoundingClientRect().width + 'px'
      mapContainer.style.position = 'absolute'
      mapContainer.style.left = 0
      mapContainer.style.top = 0
      mapContainer.style.zIndex = 1001 // over caption
      mapContainer.style.opacity = 0
      coverContainer.prepend(mapContainer)
      var mymap = L.map('map',{ 
        renderer: L.canvas(),
        attributionControl: false,
        gestureHandling: true // depends on https://github.com/elmarquis/Leaflet.GestureHandling
      })
      // mappe da thunderforest.com: 150.000 richieste al mese poi bisogna pagare, verificare
      TILELAYER.addTo(mymap)
     
      new L.GPX(gpxUrl, {
        async: true,
        marker_options: {
          startIconUrl: '/img/marker.svg',
          endIconUrl: '/img/marker.svg'
        }
      })
          .on('loaded', function (e) {
            createInfoBox(e)
            Toastify({
              text: 'Traccia caricata 👍',
              duration: 4000,
              close: false,
              gravity: 'bottom',
              position: 'right',
              className: 'c-toast--info'
            }).showToast()
            mapRendered = true
            mymap.fitBounds(e.target.getBounds())
            showButton.innerHTML = iconClose + 'Nascondi la traccia'
            mapContainer.style.opacity = 1
          })
          .addTo(mymap)
    } else {
      var map = document.getElementById('map')
      map.style.opacity = 1
      infoBoxGpx.style.opacity = 1
      showButton.innerHTML = iconClose + ' Nascondi la traccia'
    }
  }
  var hideMap = function () {
    var showButton = document.getElementById('js-showButton')
    var infoBoxGpx = document.getElementById('js-infoBoxGpx')
    showButton.innerHTML = iconShow + ' Mostra la traccia'
    var map = document.getElementById('map')
    map.style.opacity = 0
    infoBoxGpx.style.opacity = 0
  }
  var createButton = function () {
    var showButton = document.createElement('button')
    showButton.innerHTML = iconShow + 'Mostra la traccia'
    showButton.setAttribute('id', 'js-showButton')
    showButton.classList.add('c-post-gpxButton', 'js-animate-gpxButton')
    buttonContainer.prepend(showButton)
    showButton.addEventListener('click', function (e) {
      showButton.classList.toggle('js-is-open')
      if (showButton.classList.contains('js-is-open')) {
        showMap()
      } else {
        hideMap()
      }
      e.stopPropagation()
    })
  }
  var createInfoBox = function (gpxEvent) {
    var distance = Math.round(gpxEvent.target.get_distance() / 1000)
    var gain = Math.round(gpxEvent.target.get_elevation_gain())
    var infoBoxGpx = document.createElement('div')
    infoBoxGpx.setAttribute('id', 'js-infoBoxGpx')
    infoBoxGpx.classList.add('c-post-infoBoxGpx')
    infoBoxGpx.innerHTML = 'Distanza: <strong>' + distance + 'km</strong> | dislivello: <strong>' + gain + 'm</strong>'
    coverContainer.prepend(infoBoxGpx)
  }

  createButton()
})()