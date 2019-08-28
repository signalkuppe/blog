(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var input = document.querySelector('.c-toggle input')
    input.addEventListener('change', function (e) {
      document.documentElement.classList.toggle('js-darkmode')
    })
  })
})()