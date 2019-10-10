var env = document.querySelector('html').getAttribute('data-env')
if ('serviceWorker' in navigator && env !== 'development') {
  navigator.serviceWorker.register('/service-worker.js');
}

// prevent default install prompt
var deferredPrompt
var promptButton = document.getElementById('js-promptButton')
if (promptButton) {
  promptButton.style.display = 'none'
}


window.addEventListener('beforeinstallprompt', function (event) {
  event.preventDefault()
  deferredPrompt = event
  if (promptButton) { 
    if (deferredPrompt) { // prompt has been requested
      promptButton.style.display = 'inline-block'
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

window.addEventListener('appinstalled', (evt) => { // installed
  promptButton.style.display = 'none'
  Toastify({
    text: 'App aggiunta 😎',
    duration: 4000,
    close: false,
    gravity: 'bottom',
    position: 'right',
    className: 'c-toast--success'
  }).showToast()
})