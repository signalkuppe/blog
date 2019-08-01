const path = require('path')
const log = require(path.join(process.cwd(), 'log'))
const dayjs = require('dayjs')
const it = require('dayjs/locale/it')
const inputDir = 'site'
const outputDir = 'dist'

module.exports = (eleventyConfig) => {

  /*
  * Copy static assest and node libs
  */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'favicons'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'js'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'css/print.css'))
  eleventyConfig.addPassthroughCopy('node_modules/colcade/colcade.js')
  eleventyConfig.addPassthroughCopy('node_modules/baguettebox.js/dist')
  eleventyConfig.addPassthroughCopy('node_modules/vanilla-lazyload/dist/lazyload.js')
  eleventyConfig.addPassthroughCopy('node_modules/pace-progress/pace.js')
  eleventyConfig.addPassthroughCopy('node_modules/smooth-scroll/dist/smooth-scroll.js')
  eleventyConfig.addPassthroughCopy('node_modules/lunr/lunr.js')

  /*
  * Formats a date
  **/

  eleventyConfig.addFilter('formatDate', (dateString, format) => {
    try {
      return dayjs(dateString).locale(it).format(format)
    } catch (err) {
      log.error(err)
      return ''
    }
  })

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

