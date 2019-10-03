
(function () {
  /*
  * adds missing recources to the cache for offline reading
  */
  var button = document.getElementById('js-saveOfflineButton')
  var gpxButton = document.getElementById('js-gpxButton')
  var kmlButton = document.getElementById('js-kmlButton')
  var galleryLIghtBoxItems = document.querySelectorAll('.c-imageGallery a')
  if ('caches' in window) {
    button.addEventListener('click', function (e) {
      e.preventDefault()
      var pageResources = []
      caches.open('signalkuppe')
        .then(function (cache) {
          if (gpxButton) { // gpx track
            pageResources.push(gpxButton.getAttribute('href'))
          }
          if (kmlButton) { // kml track
            pageResources.push(kmlButton.getAttribute('href'))
          }
          if (galleryLIghtBoxItems.length) { // full size images of the gallery
            galleryLIghtBoxItems.forEach(function (lightBoxItem) {
              pageResources.push(lightBoxItem.getAttribute('href'))
            })
          }
          cache.addAll(pageResources)
            .then((res) => {
              Toastify({
                text: 'Ora puoi visitare questa pagina anche senza rete',
                duration: 4000,
                close: false,
                gravity: 'bottom',
                position: 'right',
                className: 'c-toast--success'
              }).showToast()
            })
            .catch(function (err) {
              Toastify({
                text: 'Ops qualcosa è andato storto 😭',
                duration: 4000,
                close: false,
                gravity: 'top',
                position: 'right',
                className: 'c-toast--error'
              }).showToast()
            })
        })
    })
  } else {
    button.parentElement.style.display = 'none' // hide element if cache is not supported
  }
})()