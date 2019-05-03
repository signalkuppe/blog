// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');

window.addEventListener('resize', () => {
  // We execute the same script as before
  // var vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty('--vh', `${vh}px`);
});