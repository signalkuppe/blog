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
const logFile = path.join(process.cwd(), process.env.ELEVENTY_CACHE_DIR, '_posts.json')
const markerFile = path.join(process.cwd(), 'dist', 'js', 'markers.js')
const contentful = require('contentful')
const htmlRenderer = require('@contentful/rich-text-html-renderer') // https://github.com/contentful/rich-text/tree/master/packages/rich-text-html-renderer
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
    order: '-fields.date'
  }
  try {
    let result = await Client.getEntries(query)
    return result
  } catch (err) {
    log.error('getEntries error', err)
    return
  }
}
const makeFullSlug = (slug) => {
  return `/${slug}.html`
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
                  src="${process.env.ELEVENTY_IMAGE_PLACEHOLDER}?fit=thumb&w=800&fm=jpg&fl=progressive"
                  alt="${node.data.target.fields.description}" 
                  class="lazyImg" /> 
                <figcaption>${node.data.target.fields.title}</figcaption>
            </figure>`
        }
      }
    }
    post.computed = {
      slug: makeFullSlug(post.fields.slug),
      body: htmlRenderer.documentToHtmlString(post.fields.body, options),
    }
    const prevNextData = (post) => {
      return {
        slug: makeFullSlug(post.fields.slug),
        date: post.fields.date,
        title: post.fields.title
      }
    }
    if (posts[i + 1]) { // prev
      post.computed.prev = prevNextData(posts[i + 1])
    }
    if (posts[i - 1]) { // next
      post.computed.next = prevNextData(posts[i - 1])
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
      link: makeFullSlug(post.fields.slug),
      tags: post.fields.tags,
      categories: post.fields.category[0],
      placeholder: `${process.env.ELEVENTY_IMAGE_PLACEHOLDER}?fit=thumb&w=200&h=200&fm=jpg&fl=progressive&q=70`,
      cover: `${post.fields.cover.fields.file.url}?fit=thumb&w=200&h=200&fm=jpg&fl=progressive&q=70`,
      autocompleteRow: `<a href="${makeFullSlug(post.fields.slug)}" data-autocomplete"><span>${date.format(post.fields.date, 'DD/MM/YY')}</span> - ${post.fields.title}</a>`
    }
  })
}

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(logFile)) { // don’t call the api every time
      try {
        await mkdirp(path.join(process.cwd(), process.env.ELEVENTY_CACHE_DIR))
        await mkdirp(path.join(process.cwd(), 'dist', 'js'))
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
        fs.writeFileSync(markerFile, `var markers = ${JSON.stringify(markers)}`, 'utf-8')
        resolve(computedPosts)
      } catch (err) {
        log.error('Posts fetch error', err)
        reject(err)
      }
    } else { // already done
      log.info(`Used cache for POSTS, to grab fresh data delete ${logFile}`)
      resolve(JSON.parse(fs.readFileSync(logFile))) // read cached file
    }
  })
}