const chalk = require('chalk')

module.exports = {
  warn: (msg) => {
    return console.log(chalk.yellow(msg))
  },
  error: (msg) => {
    return console.log(chalk.red(msg))
  },
  success: (msg) => {
    return console.log(chalk.green(msg))
  },
  info: (msg) => {
    return console.log(chalk.blueBright(msg))
  }
}