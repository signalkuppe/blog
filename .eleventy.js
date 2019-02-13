const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')
const it = require('dayjs/locale/it')
const inputDir = 'site'
const outputDir = 'dist'
const info = JSON.parse(fs.readFileSync(path.join(inputDir, '_data', 'info.json'), 'utf-8')) // read site config
module.exports = (eleventyConfig) => {

  /*
  * Copy static assest
  */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'favicons'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'js'))

  /*
  * Add a universal shortcode for site info vars ({% info 'cloudinaryCloudName' %} -> signalkuppe)
  **/

  eleventyConfig.addNunjucksShortcode('info', function (prop) {
    return info[prop]
  })

  /*
  * Formats a date according to the the staorage convention on cloudinary
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
      input: inputDir, // src files lives in /site
      output: outputDir // build to /dist
    }
  }
}

