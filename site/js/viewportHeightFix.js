// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');

window.addEventListener('resize', () => {
  var mediaQuery = window.matchMedia("(orientation: portrait)");
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!iOS || iOS && !mediaQuery.addEventListener.matches) { /* do not resize when ios is on portrait mode (when the scrollbar disapperas, the window recelaculates the --vh var)  */
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
});