/**
 * Grab posts from contentful
 * and store them in the posts collection
 * we only call the api one time, to avoid rate limit issues
 * The first time a log file is created 
 */

require('dotenv').config()
const path = require('path')
const fs = require('fs')
const log = require(path.join(process.cwd(), 'log'))
const logFile = path.join(process.cwd(), 'posts.json')
const contentful = require('contentful')
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
    order: 'sys.createdAt'
  }
  try {
    let result = await Client.getEntries(query)
    return result
  } catch (err) {
    log.error('getEntries error', err)
    process.exit(1)
  }
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
        log.info(`Found ${posts.length} posts`)
        fs.writeFileSync(logFile, JSON.stringify(posts), 'UTF-8') // write log file
        resolve(posts)
      } catch (err) {
        reject(err)
        log.error('Posts fetch error', err)
      }
    } else { // already done
      log.info(`Skipping contentful api call, to grab new posts delete ${logFile}`)
      resolve(JSON.parse(fs.readFileSync(logFile)))
    }
  })
}