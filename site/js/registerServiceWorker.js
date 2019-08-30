

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

var deferredPrompt
var promptButton = document.getElementById('js-promptButton')
if (promptButton) {
  promptButton.style.display = 'none'
  promptButton.parentElement.style.display = 'none'
}

// prevent default install prompt
window.addEventListener('beforeinstallprompt', function (event) {
  event.preventDefault()
  deferredPrompt = event
  if (promptButton) { 
    if (deferredPrompt) { // prompt has been requested (registerServiceWorker.js)
      promptButton.style.display = 'block'
      promptButton.parentElement.style.display = 'block'
      promptButton.addEventListener('click', function(e) { // delegate the prompt to user action
        e.preventDefault()
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then(function(choiceResult) {
          if (choiceResult.outcome === 'dismissed') {
            Toastify({
              text: 'Peccato, ma capisco 😉',
              duration: 4000,
              close: false,
              gravity: 'bottom',
              position: 'right',
              className: 'c-toast--info'
            }).showToast()
          }
        })
        deferredPrompt = null
      })
    }
  }
})

window.addEventListener('appinstalled', (evt) => { // already installed
  promptButton.style.display = 'none'
  promptButton.parentElement.style.display = 'none'
  Toastify({
    text: 'App aggiunta 😎',
    duration: 4000,
    close: false,
    gravity: 'bottom',
    position: 'right',
    className: 'c-toast--success'
  }).showToast()
});