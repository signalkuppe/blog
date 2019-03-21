/**
 * Watch css file changes an recompile the main entry
 */

const chokidar = require('chokidar')
const path = require('path')
const buildCss = require('./buildCss')
const log = require(path.join(process.cwd(), 'log'))
const watcher = chokidar.watch(path.join(process.cwd(), './site/css/**/*.css'), {
  persistent: true
})
const watchCss = () => {
  watcher
    .on('change', (file) => {
      log.info(`${file} changed`)
      log.info('Recompiling css...')
      buildCss()
    })
}

if (require.main === module) { // called from command line
  watchCss()
}

module.exports = watchCss
