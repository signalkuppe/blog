/**
 * Grab posts from contentful
 */

require('dotenv').config()
const contentful = require('contentful')
const Client = contentful.createClient({
  space: process.env.ELEVENTY_CONTENTFUL_SPACE,
  accessToken: process.env.ELEVENTY_CONTENTFUL_ACCESSTOKEN,
})

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let posts = []
      let iteration = 1
      let skip = 0
      let limit = 20
      let chunk = await getEntries('post', limit, skip)
      while (chunk.total > perPage * iteration) {
        skip =  perPage * iteration
        limit = perPage
        let chunk = await getEntries('post', limit, skip)
        posts = _.union(posts, chunk.items)
        iteration ++
      }
      log.info('Found %s posts', posts.length)
      resolve(posts)
    } catch (err) {
      log.error('Posts fecth error %o', err)
    }
  })
}