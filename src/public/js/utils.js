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