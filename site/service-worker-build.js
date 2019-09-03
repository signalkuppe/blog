/**
 * Dynamically adds paths to precaching
 * https://developers.google.com/web/tools/workbox/modules/workbox-build
 */
require('dotenv').config()
const path = require('path')
const log = require(path.join(process.cwd(), 'lib/log'))
const workboxBuild = require('workbox-build')
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: path.join(process.cwd(), 'site', 'service-worker.js'),
    swDest: path.join(process.cwd(), 'dist', 'service-worker.js'),
    globDirectory: path.join(process.cwd(), 'dist'),
    globIgnores: ['css/**', 'js/**', 'node_modules/**'], // we use dynamic cache for these
    globPatterns: ['favicons/*', 'img/*', '*.html'] // add root html files favicons and img files
  })
  .then(({count, size, warnings}) => {
    log.info(`Service worker: ${count} files will be precached`)
  })
}

buildSW()