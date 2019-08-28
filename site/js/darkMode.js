(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var toggle = document.querySelector('.c-toggle')
    var input = document.querySelector('.c-toggle input')
    toggle.classList.add('js-not-ready')
    var ls = Lockr.get('signalkuppe')
    if (ls) {
      if (ls.darkTheme === true) {
        document.documentElement.classList.add('js-darkmode')
        input.checked = true
      } else {
        document.documentElement.classList.remove('js-darkmode')
        input.checked = false
      }
      setTimeout(function () {
        toggle.classList.remove('js-not-ready')
      }, 250)
    }
    
    input.addEventListener('change', function (e) {
      document.documentElement.classList.toggle('js-darkmode')
      if (e.target.checked) {
        Lockr.set('signalkuppe', { darkTheme: true })
      } else {
        Lockr.set('signalkuppe', { darkTheme: false })
      }
    })
  })
})()