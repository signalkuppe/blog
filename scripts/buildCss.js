/**
 * Compiles tailwind css using postcss
 */

const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer')
const atImport = require('postcss-import')
const postcss = require('postcss')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const destDir = path.join(process.cwd(), 'dist/css')
const source = path.join(process.cwd(), 'site/css/index.css')
const dest = path.join(destDir, 'index.css')

const buildCss = () => {
  mkdirp(destDir, (err) => {
    if (err) {
      console.error('Css write directory error', err)
    } else {
      fs.readFile(source, (err, css) => {
        postcss([atImport(), postcssPresetEnv({ stage: 0 }), autoprefixer])
          .process(css, { from: source, to: dest })
          .then(result => {
            fs.writeFile(dest, result.css, (err) => {
              if (err) {
                console.error('Css write error', err)
              } else {
                console.info('Css written')
              }
            })
          })
          .catch((err) => {
            console.error('Css build error', err)
          })
      })    
    }
  })
}

if (require.main === module) { // called from command line
  buildCss()
}

module.exports = buildCss