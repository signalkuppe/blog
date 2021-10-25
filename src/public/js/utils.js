/**
 * General utilities used in all 
*/

// eslint-disable-next-line no-unused-vars
const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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
const uniqBy = function (prop) {
    if (prop)
        return (ele, i, arr) =>
            arr
                .map((ele) => ele[prop])
                .indexOf(ele[prop]) === i;
    else return (ele, i, arr) => arr.indexOf(ele) === i;
};


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

function getCssVar (varString) {
  return getComputedStyle(
                    document.documentElement,
                ).getPropertyValue(varString)
}