/* 
Grab post images from cloudinary 
Save a file with all the photos (galleries.json), and use it as a cache
Then we grab the current post's photos in the post template
*/

var photos = []
const cloudinary = require('cloudinary')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const destination = path.join(process.cwd(), 'site', '_data', 'galleries.json')
const maxResults = 400
cloudinary.config({ 
  cloud_name: 'signalkuppe', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = () => {
  return new Promise((resolve, reject) => {
    var iteration = 0
    const _searchPhotos = (next) => {
      if (fs.existsSync(destination)) {
        console.log(`Gallery json already exists, skipping cloudinary photo search`)
        resolve()
      } else {
        console.log(`Fetching photos from cloudinary`)
        cloudinary.v2.search
        .expression('folder=blog/galleries/*')
        .max_results(maxResults)
        .next_cursor(next)
        .execute()
        .then((result) => {
          iteration ++
          photos = _.flatten(_.union(photos, _.map(result.resources, (photo) => { 
            photo.title = photo.filename.replace(/\_/g, ' ')
            photo.folder = photo.folder.split('/').pop()
            return _.pick(photo, 'public_id', 'folder', 'title')
          })))
          if (result.next_cursor) {
            _searchPhotos(result.next_cursor)
          } else {
            console.log(`Found ${photos.length} photos with ${iteration} iterations on cloudinary`)
            fs.writeFile(destination, JSON.stringify(_.groupBy(photos, 'folder')), 'utf8', (err) => {
              if (err) {
                reject(err)
              } else {
                console.log(`Gallery json written`)
                resolve()
              }
            })
          }
        })
        .catch((err) => {
          reject(err)
        })
      }
    }
    _searchPhotos()
  })
}