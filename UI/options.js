const chalk = require('chalk')

const showOptions = () => {
    console.log(
        chalk.cyan('Enter the number') + 
        chalk.cyan.bold(' [1-5] ') + 
        chalk.cyan('of the book you\'d like to save to your reading list.')
    )
    console.log(
        chalk.greenBright.bold('Enter [s]') + 
        chalk.greenBright(' to find another book.')
    )
    console.log(
        chalk.blueBright.bold('Enter [l]') + 
        chalk.blueBright(' to view your reading list.')
    )
    console.log(chalk.red.bold('Enter [e]') + chalk.red(' to exit.'))
    console.log('')
}

module.exports = { showOptions }