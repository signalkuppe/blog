import slug from "slug";
import mitt from "mitt";
import { pageTitleSeparator } from "../constants";

export const headPageTitle = (title, slogan) => {
  return `${title} ${pageTitleSeparator} ${slogan}`;
};

export const photoSlug = (photo) => {
  try {
    return slug(`${photo.data.title}-${photo.id}`);
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const postPhotoSlug = (post, photoIndex) => {
  try {
    return `${post.data.slug}/photo-${photoIndex + 1}`;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const portfolioPhotoSlug = (photo) => {
  try {
    return photoSlug(photo);
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

// postGpxTrack removed - GPX tracks now handled directly via post.data.gpxTracks

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

export const trapFocus = (element) => {
  // get all focusable elements
  const focusableEls = element.querySelectorAll(
    "a[href]:not([disabled]), button:not([disabled])"
  );
  // Save first and last focusable elements
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  // listen for a key press
  element.addEventListener("keydown", function (e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

    // if the key pressed is not TAB, stop function execution
    if (!isTabPressed) {
      return;
    }

    // if shift + tab
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    }
    // else if tab
    else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
};
