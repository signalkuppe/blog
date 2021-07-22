/**
 * General utilities used in all 
*/

// eslint-disable-next-line no-unused-vars
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

// eslint-disable-next-line no-unused-vars
const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// eslint-disable-next-line no-unused-vars
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function times  (n, func = i => i) {
  return Array.from({ length: n }).map((_, i) => func(i))
}

