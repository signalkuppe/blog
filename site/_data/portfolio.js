/**
 * Grab portofolio items
 * and store them in the portfolio collection
 * we only call the api one time, to avoid rate limit issues
 * The first time a log file is created 
 */

require('dotenv').config()
const mkdirp = require('mkdirp');
const path = require('path')
const fs = require('fs')
const log = require(path.join(process.cwd(), 'lib/log'))
const logFile = path.join(process.cwd(), process.env.ELEVENTY_CACHE_DIR, '_portoflio.json')
const contentful = require('contentful')
const Client = contentful.createClient({
  space: process.env.ELEVENTY_CONTENTFUL_SPACE,
  accessToken: process.env.ELEVENTY_CONTENTFUL_ACCESSTOKEN
})
const getPhotos = async (limit, skip) => {
  let query = {
    content_type: 'portfolio',
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


module.exports = () => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(logFile)) { // don’t call the api every time
      try {
        await mkdirp(path.join(process.cwd(), process.env.ELEVENTY_CACHE_DIR))
        let photos = []
        let iteration = 1
        let skip = 0
        let limit = 20
        let chunk = await getPhotos(limit, skip)
        photos = chunk.items
        while (chunk.total > limit * iteration) {
          skip =  limit * iteration
          let chunk = await getPosts(limit, skip)
          photos = _.union(photos, chunk.items)
          iteration ++
        }
        log.success(`Found ${photos.length} photos`)
        fs.writeFileSync(logFile, JSON.stringify(photos), 'utf-8') // write log file
        resolve(photos)

      } catch (err) {
        log.error('Photos fetch error', err)
        reject(err)
      }
    } else { // already done
      log.info(`Used cache for PORTFOLIO, to grab fresh data delete ${logFile}`)
      resolve(JSON.parse(fs.readFileSync(logFile))) // read cached file
    }
  })
}