/**
 * Watch css file changes an recompile the main entry
 */

const chokidar = require('chokidar')
const path = require('path')
const buildCss = require('./buildCss')
const watcher = chokidar.watch(path.join(process.cwd(), './site/css/*'), {
  persistent: true
})
const watchCss = () => {
  watcher
    .on('add', () => {
      console.info('watching css...')
    })
    .on('change', () => {
      console.info('Recompiling css...')
      buildCss()
    })
}

if (require.main === module) { // called from command line
  watchCss()
}

module.exports = watchCss
