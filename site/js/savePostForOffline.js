(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var button = document.getElementById('js-saveOffline')
    if ('serviceWorker' in navigator) {
      button.addEventListener('click', function () {
        console.log('save')
        return false
      })
    } else {
      button.style.display = 'none'
    }
  })
})()