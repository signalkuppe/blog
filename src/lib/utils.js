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
