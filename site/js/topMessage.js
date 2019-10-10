(function () {
  var closeButton = document.getElementById('js-topMessage-close')
  var topMessage = document.getElementById('js-topMessage')
  var ls = Lockr.get('signalkuppe-new')
  if (ls) {
    if (ls.topMessage === false) {
      topMessage.style.display = 'none'
    }
  } else {
    topMessage.style.display = 'block'
  }
  closeButton.addEventListener('click', function (e) {
    e.preventDefault()
    topMessage.style.display = 'none'
    Lockr.set('signalkuppe-new', { topMessage: false })
  })
})()