const chalk = require('chalk')

const chooseBookOption = chalk.cyan('Enter the number') + 
                   chalk.cyan.bold(' [1-5] ') + 
                   chalk.cyan('of the book you\'d like to save to your reading list.')

const queryNewBookOption = chalk.greenBright.bold('Enter [s]') + 
                     chalk.greenBright(' to find another book.')

const viewListOption = chalk.blueBright.bold('Enter [l]') + 
                          chalk.blueBright(' to view your reading list.')

const exitOption = chalk.red.bold('Enter [e]') + chalk.red(' to exit.') + '\n'


const showOptions = () => {
    console.log(chooseBookOption)
    console.log(queryNewBookOption)
    console.log(viewListOption)
    console.log(exitOption)
}

module.exports = { showOptions, chooseBookOption, exitOption }