/**
 * Compiles tailwind css using postcss
 */

const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer')
const atImport = require('postcss-import')
const mixins = require('postcss-mixins')
const postcss = require('postcss')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const log = require(path.join(process.cwd(), 'log'))
const destDir = path.join(process.cwd(), 'dist/css')
const source = path.join(process.cwd(), 'site/css/index.css')
const dest = path.join(destDir, 'index.css')


const buildCss = () => {
  mkdirp(destDir, (err) => {
    if (err) {
      log.error('Css write directory error' + err)
    } else {
      fs.readFile(source, (err, css) => {
        postcss([atImport(), mixins(), postcssPresetEnv({ stage: 0 }), autoprefixer])
          .process(css, { from: source, to: dest })
          .then(result => {
            fs.writeFile(dest, result.css, (err) => {
              if (err) {
                log.error('Css write error' + err)
              } else {
                log.success('Css written')
              }
            })
          })
          .catch((err) => {
            log.error('Css build error' + err)
          })
      })    
    }
  })
}

if (require.main === module) { // called from command line
  buildCss()
}

module.exports = buildCss