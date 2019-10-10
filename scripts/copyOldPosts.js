const fs = require('fs-extra')
const path = require('path')
const log = require(path.join(process.cwd(), 'lib/log'))

try {
  fs.copySync(path.join(process.cwd(),'oldHtml'), path.join(process.cwd(),'dist'), { overwrite: false })
  log.warn('Old posts copied to dist')
} catch (err) {
  log.error('An error occured while copying the old posts')
}
