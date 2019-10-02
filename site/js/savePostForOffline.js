
(function () {
  var button = document.getElementById('js-saveOfflineButton')
  var gpx = document.getElementById('js-hasGpx')
  if ('caches' in window) {
    button.addEventListener('click', function (e) {
      e.preventDefault()

      caches.open('signalkuppe')
        .then(function (cache) {
          var pageResources = [location.href]
          document.querySelectorAll('link[rel="stylesheet"]')
            .forEach(function (link) {
              pageResources.push(link.getAttribute('href'))
            })
          document.querySelectorAll('script[src]')
            .forEach(function (script) {
              pageResources.push(script.getAttribute('src'))
            })
          document.querySelectorAll('img[src]')
            .forEach(function (image) {
              pageResources.push(image.getAttribute('src'))
            })
          if (gpx) {
            pageResources.push(gpx.getAttribute('data-gpx'))
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