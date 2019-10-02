


import { Workbox } from '/node_modules/workbox-window/build/workbox-window.prod.mjs'
var env = document.querySelector('html').getAttribute('data-env')


if ('serviceWorker' in navigator && env !== 'development') {
  const wb = new Workbox('/service-worker.js')
  wb.addEventListener('installed', event => {
    if (event.isUpdate) {
      Toastify({
        text: '<a href="" onclick="window.location.reload(); return false;" style="text-decoration: none; display: block;">✋È disponibile una nuova versione del sito<br /><strong>Clicca qui per aggiornare</strong></a>',
        duration: 100000,
        close: false,
        gravity: 'top',
        position: 'right',
        className: 'c-toast--info',
      }).showToast()
    }
  })
  wb.register()
}

var deferredPrompt
var promptButton = document.getElementById('js-promptButton')
if (promptButton) {
  promptButton.style.display = 'none'
}

// prevent default install prompt
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

window.addEventListener('appinstalled', (evt) => { // already installed
  promptButton.style.display = 'none'
  Toastify({
    text: 'App aggiunta 😎',
    duration: 4000,
    close: false,
    gravity: 'bottom',
    position: 'right',
    className: 'c-toast--success'
  }).showToast()
});