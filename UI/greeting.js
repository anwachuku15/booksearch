const term = require('terminal-kit').terminal
const boxen = require('boxen')
const chalk = require('chalk')
const emoji = require('emojic')

const styles = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'red',
    backgroundColor: 'blue'
}

const greeting = () => {
    const greetingMsg = chalk.white(`${emoji.books} Welcome to Your Book Club! ${emoji.books}`)
    const msgBox = boxen(greetingMsg, styles)
    console.log(msgBox)
    console.log(
        'Powered by ' + 
        chalk.bold.blue('G') +
        chalk.bold.red('o') +
        chalk.bold.yellow('o') +
        chalk.bold.blue('g') +
        chalk.bold.green('l') +
        chalk.bold.red('e') +
        chalk.bold.blueBright(' Books')
    )
    term.bold.cyan("\nGo ahead and search for a book!\n\n")
}

module.exports = { greeting }