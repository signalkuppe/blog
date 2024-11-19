import slug from "slug";
import mitt from "mitt";

export const postPhotoSlug = (post, photo) => {
  try {
    return `${post.fields.slug}/${slug(
      `${photo.fields.title}-${photo.sys.id}`
    )}`;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const throttle = function (fn, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn(...args);
    }
  };
};

export const postGpxTrack = (post) => {
  try {
    return `https:${
      post.fields.gpsTracks.find(
        (t) => t.fields.file.fileName.indexOf(".gpx") !== -1
      )?.fields.file.url
    }`;
  } catch (err) {
    return false;
  }
};

export const getCssVar = (varString) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varString);
};

export const animateValue = (obj, start, end, duration) => {
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
};

export const artificialDelay = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export const emitter = mitt();
