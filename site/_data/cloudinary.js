/* 
Grab post images from cloudinary 
Then we grab the current post's photos in the post template
*/

var photos = []
const cloudinary = require('cloudinary')
const _ = require('lodash')
const path = require('path')
const log = require(path.join(process.cwd(), 'log'))
const maxResults = 500
cloudinary.config({ 
  cloud_name: 'signalkuppe', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = () => {
  return new Promise((resolve, reject) => {
    var iteration = 0
    const _searchPhotos = (next) => {
      log.info(`Fetching photos from cloudinary`)
      cloudinary.v2.search
      .expression('folder=blog/galleries/*')
      .max_results(maxResults)
      .next_cursor(next)
      .with_field('context')
      .execute((err, result) => {
        if (err) {
          log.error('Cloudinary api call error' + err)
          reject(err)
        } else {
          iteration ++
          photos = _.flatten(_.union(photos, _.map(result.resources, (photo) => { 
            photo.folder = photo.folder.split('/').pop()
            return _.pick(photo, 'public_id', 'folder', 'title', 'context')
          })))
          if (result.next_cursor) {
            _searchPhotos(result.next_cursor)
          } else {
            log.info(`Found ${photos.length} photos with ${iteration} iterations on cloudinary`)
            log.warn(`Rate limit ramaining ${result.rate_limit_remaining}, resets at ${result.rate_limit_reset_at}`)
            resolve({ photos: _.groupBy(photos, 'folder') })
          }
        }
      })
    }
    _searchPhotos()
  })
}