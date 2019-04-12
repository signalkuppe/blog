const path = require('path')
const log = require(path.join(process.cwd(), 'log'))
const fs = require('fs')
const dayjs = require('dayjs')
const markdownIt = require('markdown-it')
const mdCustomBlock = require('markdown-it-custom-block')
const it = require('dayjs/locale/it')
const inputDir = 'site'
const outputDir = 'dist'
const info = JSON.parse(fs.readFileSync(path.join(inputDir, '_data', 'info.json'), 'utf-8')) // read site config
module.exports = (eleventyConfig) => {

  /*
  * Custom markdown block for inline images
  * @[image]({ "id": "", "title": "", "alt": "" })
  */

  const markdownLib = markdownIt({ html: true })
    .use(mdCustomBlock, {
      image (args) {
        try {
          let {id, title, alt } = JSON.parse(args)
          if (!id || !title || !alt) {
            log.warn('Missing inline image params')
          }
          return `
            <figure>
              <img 
                  src="https://res.cloudinary.com/signalkuppe/image/upload/w_1280,f_auto,q_10,e_blur:1000/${id}"
                  data-src="https://res.cloudinary.com/signalkuppe/image/upload/w_1280,f_auto,q_auto/${id}"
                  alt="${alt}" 
                  class="lazyImg" /> 
                <figcaption>L${title}</figcaption>
            </figure>`
        } catch (err) {
          log.error(err)
          return ''
        }
      }
    })
  
  eleventyConfig.setLibrary('md', markdownLib);

  /*
  * Copy static assest and node libs
  */

  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'favicons'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'js'))
  eleventyConfig.addPassthroughCopy(path.join(inputDir, 'css/print.css'))
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
      log.error(err)
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


  /*
  * Add all posts as a collection
  */

  eleventyConfig.addCollection('posts', collection => {
    try {
      const posts = collection.getFilteredByGlob(path.join(inputDir, 'posts', '/*.md')).sort((a, b) => {
        return b.date - a.date
      })
      
      // write markers in js file (we can minify it at build time)
      // we use this file as an index for lunr search
      const markers = posts.map((p) => {
        const postDate = eleventyConfig.javascriptFunctions.formatDate(p.data.date, 'DD/MM/YY')
        return {
          lat: p.data.cords.lat,
          lng: p.data.cords.lng,
          title: p.data.title,
          description: p.data.description,
          date: postDate,
          link: p.url,
          tags: p.data.tags,
          categories: p.data.category,
          cover: `https://res.cloudinary.com/${info.cloudinaryCloudName}/image/upload/w_100,h_100,c_fill,f_auto,q_20,g_center${p.data.cover.version ? '/' + p.data.cover.version : ''}/${p.data.cover.id}`,
          autocompleteRow: `<a href="${p.url}" data-autocomplete">${postDate} - ${p.data.title}</a>`
        }
      })
  
      fs.writeFileSync(path.join(outputDir, 'js', 'markers.js'), `var markers = ${JSON.stringify(markers)}`, 'utf-8')
      return posts 
    } catch (err) {
      log.error(err)
    }
  })

  return {
    dir: {
      input: inputDir, // src files live in /site
      output: outputDir // build to /dist
    }
  }
}

