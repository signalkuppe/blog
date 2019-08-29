

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
  var deferredPrompt
  // prevent default install prompt
  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault()
    deferredPrompt = event
    return false
  })
}