(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var button = document.getElementById('js-promptButton')
    button.style.display = 'none'
    button.parentElement.style.display = 'none'
    if (deferredPrompt) { // prompt has been requested (registerServiceWorker.js)
      button.style.display = 'block'
      button.parentElement.style.display = 'block'
      button.addEventListener('click', function(e) {
        e.preventDefault()
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then(function(choiceResult) {
          if (choiceResult.outcome === 'dismissed') {
            alert('buuu!!!')
          } else {
            alert('yeah!!!')
          }
        })
        deferredPrompt = null
      })
    }
  })
})()