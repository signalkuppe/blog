const dayjs = require('dayjs')
const it = require('dayjs/locale/it')
const path = require('path')
const log = require(path.join(process.cwd(), 'lib/log'))

module.exports = {
  format  (dateString, format) {
    try {
      return dayjs(dateString).locale(it).format(format)
    } catch (err) {
      log.error(err)
      return ''
    }
  }
}