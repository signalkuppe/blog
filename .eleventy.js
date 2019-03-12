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
  eleventyConfig.addPassthroughCopy('node_modules/lunr/lunr.js')

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
  * Post lat/long
  **/

  eleventyConfig.addFilter('postLatLong', (cordsString, type) => {
    try {
      const position = type === 'lat' ? 0 : 1
      return cordsString.split(',')[position].trim()
    } catch (err) {
      console.error(err)
      return ''
    }
  })


  /*
  * Add all posts as a collection
  */

  eleventyConfig.addCollection('posts', collection => {
    const posts = collection.getFilteredByGlob(path.join(inputDir, 'posts', '/*.md')).sort((a, b) => {
      return b.date - a.date
    })
    
    // write markers in js file (we can minify it at build time)
    // we use this file as an index for lunr search
    const markers = posts.map((p) => {
      const coverId = `blog/covers/${eleventyConfig.javascriptFunctions.formatDate(p.data.date, 'DDMMYY')}`
      return {
        lat: eleventyConfig.javascriptFunctions.postLatLong(p.data.map, 'lat'),
        lng: eleventyConfig.javascriptFunctions.postLatLong(p.data.map, 'long'),
        title: p.data.title,
        description: p.data.description,
        date: eleventyConfig.javascriptFunctions.formatDate(p.data.date, 'DD/MM/YY'),
        link: p.url,
        tags: p.data.tags.join(' '),
        categories: p.data.categories,
        cover: `https://res.cloudinary.com/${info.cloudinaryCloudName}/image/upload/w_150,h_150,c_fill,f_auto,q_50,g_center${p.data.version ? '/' + p.data.version : ''}/${coverId}`,
        marker: `https://res.cloudinary.com/${info.cloudinaryCloudName}/image/upload/w_150,h_150,c_fill,f_auto,q_50,g_center${p.data.version ? '/' + p.data.version : ''}/${coverId}`,
      }
    })

    fs.writeFileSync(path.join(outputDir, 'js', 'markers.js'), `var markers = ${JSON.stringify(markers)}`, 'utf-8')
    return posts
  })

  return {
    dir: {
      input: inputDir, // src files live in /site
      output: outputDir // build to /dist
    }
  }
}

