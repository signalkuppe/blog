
(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    const a = stickybits('#pageHeader', { // fires position sticky on #pageHeader
      useStickyClasses: true, // adds a class when the div is sticky
      scrollEl: '#main', // check the scroll on main (not body) to see if it's sticky
    })
    console.log(a)
  })
})()