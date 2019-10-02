const path = require('path')
const log = require(path.join(process.cwd(), 'lib/log'))
const date = require(path.join(process.cwd(), 'lib/date'))
const inputDir = 'site'
const outputDir = 'dist'

module.exports = (eleventyConfig) => {

  eleventyConfig.setTemplateFormats('njk', 'css', 'js') // include css and js to watch and reload on save

  /*
  * Copy static assest and node libs
  */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'favicons'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'js'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'css'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'img'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'service-worker.js'))
  eleventyConfig.addPassthroughCopy('node_modules/toastify-js/src') // we need also the css
  eleventyConfig.addPassthroughCopy('node_modules/lockr/lockr.js')
  eleventyConfig.addPassthroughCopy('node_modules/workbox-sw/build/workbox-sw.js')
  eleventyConfig.addPassthroughCopy('node_modules/workbox-window/build/workbox-window.prod.mjs')
  eleventyConfig.addPassthroughCopy('node_modules/colcade/colcade.js')
  eleventyConfig.addPassthroughCopy('node_modules/baguettebox.js/dist') // we need also the css
  eleventyConfig.addPassthroughCopy('node_modules/vanilla-lazyload/dist/lazyload.js')
  eleventyConfig.addPassthroughCopy('node_modules/smooth-scroll/dist/smooth-scroll.js')
  eleventyConfig.addPassthroughCopy('node_modules/lunr/lunr.js')
  eleventyConfig.addPassthroughCopy('node_modules/gsap/src/uncompressed/TweenMax.js')
  eleventyConfig.addPassthroughCopy('node_modules/leaflet/dist')
  eleventyConfig.addPassthroughCopy('node_modules/leaflet-gesture-handling/dist')
  eleventyConfig.addPassthroughCopy('node_modules/leaflet-gpx')
  eleventyConfig.addPassthroughCopy('node_modules/pristinejs')

  /*
  * Formats a date
  **/

  eleventyConfig.addFilter('formatDate', (dateString, format) => date.format(dateString, format))

  /*
  * Wraps first char in a span
  **/

  eleventyConfig.addFilter('wrapFirstChar', (string) => {
    try {
      return `<span>${string.slice(0, 1)}</span>${string.slice(1)}`
    } catch (err) {
      log.warn(`wrapFirstChar filter error: ${err}`)
      return ''
    }
  })

  return {
    dir: {
      input: inputDir, // src files live in /site
      output: outputDir // build to /dist
    }
  }
}

