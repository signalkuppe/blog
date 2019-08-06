const path = require('path')
const date = require(path.join(process.cwd(), 'lib/date'))
const inputDir = 'site'
const outputDir = 'dist'

module.exports = (eleventyConfig) => {

  eleventyConfig.setTemplateFormats('njk', 'css') // include css to watch and reload on css save

  /*
  * Copy static assest and node libs
  */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'favicons'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'js'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'css'))
  eleventyConfig.addPassthroughCopy('node_modules/colcade/colcade.js')
  eleventyConfig.addPassthroughCopy('node_modules/baguettebox.js/dist')
  eleventyConfig.addPassthroughCopy('node_modules/vanilla-lazyload/dist/lazyload.js')
  eleventyConfig.addPassthroughCopy('node_modules/pace-progress/pace.js')
  eleventyConfig.addPassthroughCopy('node_modules/smooth-scroll/dist/smooth-scroll.js')
  eleventyConfig.addPassthroughCopy('node_modules/lunr/lunr.js')
  eleventyConfig.addPassthroughCopy('node_modules/gsap/src/uncompressed/TweenMax.js')

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

