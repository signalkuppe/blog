(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    new SmoothScroll('a[href*="#"]', {
      speed: 100
    })
  })
})()