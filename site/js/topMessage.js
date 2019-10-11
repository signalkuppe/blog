(function () {
  var lsVersion = document.querySelector('html').getAttribute('data-localstorage-version')
  var lsKey = 'signalkuppe-top-message-accepted-' + lsVersion
  var closeButton = document.getElementById('js-topMessage-close')
  var topMessage = document.getElementById('js-topMessage')
  var topMessageValue = Lockr.get(lsKey)
  if (topMessageValue) {
    topMessage.style.display = 'none'
  } else {
    topMessage.style.display = 'block'
  }
  closeButton.addEventListener('click', function (e) {
    e.preventDefault()
    topMessage.style.display = 'none'
    Lockr.set(lsKey, true)
  })
})()