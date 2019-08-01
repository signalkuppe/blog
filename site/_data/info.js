/**
 * expose environment variables (only ELEVENTY_*) 
 */

const _ = require('lodash')
const filterEnvVars = () => {
  require('dotenv').config()
  let output = {}
  _.each(process.env, (value, key) => {
    if (key.indexOf('ELEVENTY_') !== -1) {
      output[key] = value
    }
  })
  console.log(output)
  return output
}
module.exports = {
  env: filterEnvVars()
}