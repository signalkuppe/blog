/**
 * Grab posts from contentful
 * and store them in the posts collection
 * we only call the api one time, to avoid rate limit issues
 * The first time a log file is created 
 */

require('dotenv').config()
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp');
const log = require(path.join(process.cwd(), 'lib/log'))
const date = require(path.join(process.cwd(), 'lib/date'))
const logFile = path.join(process.cwd(), 'posts.json')
const markerFile = path.join(process.cwd(), 'dist', 'js', 'markers.js')
const contentful = require('contentful')
const htmlRenderer = require('@contentful/rich-text-html-renderer') // https://github.com/contentful/rich-text/tree/master/packages/rich-text-html-renderer
const BLOCKS = require('@contentful/rich-text-types')
const Client = contentful.createClient({
  space: process.env.ELEVENTY_CONTENTFUL_SPACE,
  accessToken: process.env.ELEVENTY_CONTENTFUL_ACCESSTOKEN
})
const getPosts = async (limit, skip) => {
  let query = {
    content_type: 'post',
    include: 1,
    skip: skip,
    limit: limit,
    order: '-sys.createdAt'
  }
  try {
    let result = await Client.getEntries(query)
    return result
  } catch (err) {
    log.error('getEntries error', err)
    return
  }
}
const makePermalink = (post) => {
  return `/${post.fields.category[0].toLowerCase()}/${date.format(post.fields.date, 'YYYY')}/${date.format(post.fields.date, 'MM')}/${date.format(post.fields.date, 'DD')}/${post.fields.slug}/index.html`
}
const transformPosts = (posts) => { // ad some custom prop
  return posts.map((post, i) => {
    const options = {
      renderNode: {
        'embedded-asset-block': (node) => { // how to render embedded images in rich text
          return `
            <figure class="${i % 2 ? 'post-image-odd' : 'post-img-even'}">
              <img 
                  data-src="${node.data.target.fields.file.url}?fit=thumb&w=1440&fm=jpg&fl=progressive&q=70"
                  alt="${node.data.target.fields.description}" 
                  class="lazyImg" /> 
                <figcaption>${node.data.target.fields.title}</figcaption>
            </figure>`
        }
      }
    }
    post.computed = {
      body: htmlRenderer.documentToHtmlString(post.fields.body, options),
      permalink: makePermalink(post)
    }
    if (posts[i - 1]) { // prev
      post.computed.prev = {
        permalink: makePermalink(posts[i - 1]),
        date: posts[i - 1].fields.date,
        title: posts[i - 1].fields.title
      }
    }
    if (posts[i + 1]) { // next
      post.computed.next = {
        permalink: makePermalink(posts[i + 1]),
        date: posts[i + 1].fields.date,
        title: posts[i + 1].fields.title
      }
    }
    return post
  })
}
const makeMarkers = (posts) => { // make markers index, used also in lunr search
  return posts.map((post) => {
    return {
      lat: post.fields.location.lat,
      lng: post.fields.location.lon,
      title: post.fields.title,
      description: post.fields.description,
      date: date.format(post.fields.date, 'DD/MM/YY'),
      link: makePermalink(post),
      tags: post.fields.tags,
      categories: post.fields.category[0],
      cover: post.fields.cover.fields.file.url,
      autocompleteRow: `<span>${date.format(post.fields.date, 'DD/MM/YY')}</span> - <a href="${makePermalink(post)}" data-autocomplete">${post.fields.title}</a>`
    }
  })
}

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(logFile)) { // don’t call the api every time
      try {
        let posts = []
        let iteration = 1
        let skip = 0
        let limit = 20
        let chunk = await getPosts(limit, skip)
        posts = chunk.items
        while (chunk.total > limit * iteration) {
          skip =  limit * iteration
          let chunk = await getPosts(limit, skip)
          posts = _.union(posts, chunk.items)
          iteration ++
        }
        log.success(`Found ${posts.length} posts`)
        const computedPosts = transformPosts(posts)
        const markers = makeMarkers(posts)
        fs.writeFileSync(logFile, JSON.stringify(computedPosts), 'utf-8') // write log file
        mkdirp(path.join(process.cwd(), 'dist', 'js'), (err) => {
          if (err) {
            reject(err)
          } else {
            fs.writeFileSync(markerFile, `var markers = ${JSON.stringify(markers)}`, 'utf-8')
            resolve(computedPosts)
          }
        })
      } catch (err) {
        log.error('Posts fetch error', err)
        reject(err)
      }
    } else { // already done
      log.info(`Skipping contentful api call, to grab new posts delete ${logFile}`)
      resolve(JSON.parse(fs.readFileSync(logFile))) // read cached file
    }
  })
}