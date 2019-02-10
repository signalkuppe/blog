const path = require('path')
const fs = require('fs')
const Nunjucks = require("nunjucks")
const dayjs = require('dayjs')
const inputDir = 'site'
const outputDir = 'dist'
const info = JSON.parse(fs.readFileSync(path.join(inputDir, '_data', 'info.json'), 'utf-8')) // read site config
module.exports = (eleventyConfig) => {

  /*
  * Create a custom nunjucks env, so we can pass some global vars for macros
  */

  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader(path.join(inputDir, '_includes'))
  )
  
  nunjucksEnvironment.addGlobal('info', info)
  
  eleventyConfig.setLibrary('njk', nunjucksEnvironment)

  /*
  * Copy static assest
  */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'favicons'))

  /*
  * Formats a date according to the the staorage convention on cloudinary
  **/

  eleventyConfig.addFilter('formatDate', (dateString, format) => {
    try {
      return dayjs(dateString).format(format)
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

