(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var scrollEl = '#main'
    if (window.matchMedia("(orientation: portrait)").matches) {
      scrollEl = null // relative to viewport
    }
    stickybits('#contentHeader', { // fires position sticky on #pageHeader
      useStickyClasses: true, // adds a class when the div is sticky
      scrollEl: scrollEl // check the scroll on main or body (portrait)
    })
  })
})()