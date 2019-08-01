/**
 * Grab posts from contentful
 */

require('dotenv').config()
const path = require('path')
const log = require(path.join(process.cwd(), 'log'))
const contentful = require('contentful')
const Client = contentful.createClient({
  space: process.env.ELEVENTY_CONTENTFUL_SPACE,
  accessToken: process.env.ELEVENTY_CONTENTFUL_ACCESSTOKEN,
})
const getPosts = async (limit, skip) => {
  let query = {
    content_type: 'post',
    include: 1,
    skip: skip,
    limit: limit,
    order: 'sys.createdAt'
  }
  try {
    let result = await Client.getEntries(query)
    return result
  } catch (err) {
    log.error('getEntries error %o', err)
    process.exit(1)
  }
}

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let posts = []
      let iteration = 1
      let skip = 0
      let limit = 20
      let chunk = await getPosts(limit, skip)
      while (chunk.total > limit * iteration) {
        skip =  limit * iteration
        let chunk = await getPosts(limit, skip)
        posts = _.union(posts, chunk.items)
        iteration ++
        console.log('!!!', iteration)
      }
      log.info('Found %s posts', posts.length)
      resolve(posts)
    } catch (err) {
      reject(err)
      log.error('Posts fetch error %o', err)
    }
  })
}