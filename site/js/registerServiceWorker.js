

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

var deferredPrompt
// prevent default install prompt
window.addEventListener('beforeinstallprompt', function (event) {
  event.preventDefault()
  deferredPrompt = event
  console.log('prompt event prevent', deferredPrompt)
})

var promptButton = document.getElementById('js-promptButton')
if (promptButton) {
  promptButton.style.display = 'none'
  promptButton.parentElement.style.display = 'none'
  console.log('addtoHome', deferredPrompt)
  if (deferredPrompt) { // prompt has been requested (registerServiceWorker.js)
    promptButton.style.display = 'block'
    promptButton.parentElement.style.display = 'block'
    promptButton.addEventListener('click', function(e) {
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
}