/**
 * Compiles tailwind css using postcss
 */

const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const destDir = path.join(process.cwd(), 'dist/css')
const source = path.join(process.cwd(), 'site/css/index.css')
const dest = path.join(destDir, 'index.css')

mkdirp(destDir, (err) => {
  if (err) {
    console.error('Css write directory error', err)
  } else {
    fs.readFile(source, (err, css) => {
      postcss([tailwindcss('./tailwind.js'), autoprefixer])
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