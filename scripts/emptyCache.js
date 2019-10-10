require('dotenv').config()
const rimraf = require('rimraf')
const path = require('path')
const log = require(path.join(process.cwd(), 'lib/log'))

rimraf(process.env.ELEVENTY_CACHE_DIR, () => { 
  log.success(`Cache deleted`)
})
