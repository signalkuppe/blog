import slug from "slug";

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
