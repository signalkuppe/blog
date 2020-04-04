const path = require("path");
const log = require(path.join(process.cwd(), "lib/log"));
const date = require(path.join(process.cwd(), "lib/date"));
const inputDir = "site";
const outputDir = "dist";

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats("njk", "css", "js"); // include css and js to watch and reload on save

  /*
   * Copy static assest and node libs
   */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, "favicons"));
  eleventyConfig.addPassthroughCopy(path.join(inputDir, "js"));
  eleventyConfig.addPassthroughCopy(path.join(inputDir, "css"));
  eleventyConfig.addPassthroughCopy(path.join(inputDir, "img"));
  eleventyConfig.addPassthroughCopy(path.join(inputDir, "service-worker.js"));
  eleventyConfig.addPassthroughCopy(path.join(inputDir, "_redirects"));
  eleventyConfig.addPassthroughCopy({
    "node_modules/toastify-js/src/*.css": "css/lib",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/toastify-js/src/*.js": "js/lib",
  });
  eleventyConfig.addPassthroughCopy({ "node_modules/colcade/*.js": "js/lib" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/baguettebox.js/dist/*.css": "css/lib",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/baguettebox.js/dist/*.js": "js/lib",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/vanilla-lazyload/dist/*.js": "js/lib",
  });
  eleventyConfig.addPassthroughCopy({ "node_modules/lunr/*.js": "js/lib" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/gsap/dist/*.js": "js/lib",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/leaflet/dist/*.js": "js/lib",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/leaflet/dist/*.css": "css/lib",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/leaflet-gpx/*.js": "js/lib",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/pristinejs/dist/*.js": "js/lib",
  });

  /*
   * Formats a date
   **/

  eleventyConfig.addFilter("formatDate", (dateString, format) =>
    date.format(dateString, format)
  );

  /*
   * Wraps first char in a span
   **/

  eleventyConfig.addFilter("wrapFirstChar", (string) => {
    try {
      return `<span>${string.slice(0, 1)}</span>${string.slice(1)}`;
    } catch (err) {
      log.warn(`wrapFirstChar filter error: ${err}`);
      return "";
    }
  });

  return {
    dir: {
      input: inputDir, // src files live in /site
      output: outputDir, // build to /dist
    },
  };
};
