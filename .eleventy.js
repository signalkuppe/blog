const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')
const it = require('dayjs/locale/it')
const inputDir = 'site'
const outputDir = 'dist'
const info = JSON.parse(fs.readFileSync(path.join(inputDir, '_data', 'info.json'), 'utf-8')) // read site config
module.exports = (eleventyConfig) => {

  /*
  * Copy static assest and node libs
  */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'favicons'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'js'))
  eleventyConfig.addPassthroughCopy('node_modules/stickybits/dist/stickybits.js')
  eleventyConfig.addPassthroughCopy('node_modules/baguettebox.js/dist/baguetteBox.js')
  eleventyConfig.addPassthroughCopy('node_modules/baguettebox.js/dist/baguetteBox.css')
  eleventyConfig.addPassthroughCopy('node_modules/vanilla-lazyload/dist/lazyload.js')
  eleventyConfig.addPassthroughCopy('node_modules/pace-progress/pace.js')
  eleventyConfig.addPassthroughCopy('node_modules/smooth-scroll/dist/smooth-scroll.js')

  /*
  * Add a universal shortcode for site info vars ({% info 'cloudinaryCloudName' %} -> signalkuppe)
  **/

  eleventyConfig.addNunjucksShortcode('info', (prop) => {
    try {
      return info[prop]
    } catch (err) {
      console.error(err)
      return ''
    }
    
  })

  /*
  * Formats a date
  **/

  eleventyConfig.addFilter('formatDate', (dateString, format) => {
    try {
      return dayjs(dateString).locale(it).format(format)
    } catch (err) {
      console.error(err)
      return ''
    }
  })


  /*
  * Add all posts as a collection
  */

  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob(path.join(inputDir, 'posts', '/*.md')).sort((a, b) => {
      return b.date - a.date
    })
  })

  return {
    dir: {
      input: inputDir, // src files live in /site
      output: outputDir // build to /dist
    }
  }
}

