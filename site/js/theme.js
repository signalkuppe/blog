(function () {
  var toggle = document.querySelector('.c-toggle')
  var input = document.querySelector('.c-toggle input')
  var darkClass = 'theme-dark'
  var notReadyClass = 'js-not-ready'
  toggle.classList.add(notReadyClass)
  var ls = Lockr.get('signalkuppe')
  if (ls) {
    if (ls.darkTheme === true) {
      document.documentElement.classList.add(darkClass)
      input.checked = true
    } else {
      document.documentElement.classList.remove(darkClass)
      input.checked = false
    }
    setTimeout(function () {
      toggle.classList.remove(notReadyClass)
    }, 250)
  } else {
    toggle.classList.remove(notReadyClass)
  }
  
  input.addEventListener('change', function (e) {
    document.documentElement.classList.toggle(darkClass)
    if (e.target.checked) {
      Lockr.set('signalkuppe', { darkTheme: true })
    } else {
      Lockr.set('signalkuppe', { darkTheme: false })
    }
  })
})()