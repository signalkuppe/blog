
var promptButton = document.getElementById('js-promptButton')
promptButton.style.display = 'none'
promptButton.parentElement.style.display = 'none'
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