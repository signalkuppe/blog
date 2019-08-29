

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  var deferredPrompt
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
  // prevent default install prompt
  window.addEventListener('beforinstallprompt', function (event) {
    event.preventDefault()
    deferredPrompt = event
    return false
  })
  
}