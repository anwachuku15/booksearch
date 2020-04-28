#!/usr/bin/env node
const term = require('terminal-kit').terminal
const chalk = require('chalk')
const boxen = require('boxen')

const styles = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'magenta',
    backgroundColor: 'black'
}

const greeting = () => {
    const greetingMsg = chalk.redBright.bold('Welcome to Your Book Club!')
    const msgBox = boxen(greetingMsg, styles)
    console.log(msgBox)
    term.bold.red("Let's get started!\n\n")
}

const app = () => {
    greeting()

    // Run app until user exits - WHILE LOOP
        // Navigate thru app?? -- IF STATEMENTS
            // allow user to search for a book - display 5 results

            // allow user to add a book to their reading list

            // allow user to view their reading list

            // allow user to exit app -- exit out of while loop
}

app()