#!/usr/bin/env node
const term = require('terminal-kit').terminal
const chalk = require('chalk')
const boxen = require('boxen')
const readline = require('readline-sync')
// const inquirer = require('inquirer')

const { fetchBooks, addToList, viewList } = require('../actions')

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


const app = async () => {
    let navTo = 'greeting'
    // Run app until user exits - WHILE LOOP
    while (navTo !== 'exit') {
    // Navigate thru app?? -- IF STATEMENTS
        // allow user to search for a book - display 5 results
        if (navTo === 'greeting') {
            greeting()
            navTo = 'query'
        }
        if (navTo === 'query') {
            const query = readline.question('Search: ')
            const books = await fetchBooks(query)
            bookResults = books
            // make displayed book results more user friendly
            let i = 1
            books.forEach(book => {
                console.log(`${i}. ${book.title}\n   ${book.author}\n   ${book.publisher}\n`)
                i++
            })
            navTo = 'options'
        }
        if (navTo === 'options') {
            
            console.log('---OPTIONS---')
            console.log(chalk.cyan('Enter the number of the book you\'d like to save to your reading list'))
            console.log(chalk.greenBright.bold('Enter [s]') + chalk.greenBright(' to find another book.'))
            console.log(chalk.blueBright.bold('Enter [l]') + chalk.blueBright(' to view your reading list.'))
            console.log(chalk.red.bold('Enter [e]') + chalk.red(' to exit.'))
            const option = readline.question('>> ')
            if (option === 's') {
                navTo = 'query'
            }
            // allow user to add a book to their reading list
            if (parseInt(option) > 0 && parseInt(option) < 6) {
                addToList(bookResults[option-1])
                navTo = 'options'
            }
            if (option === 'l') {
                navTo = 'viewList'
            }
            if (option === 'e') {
                navTo = 'exit'
            }
        }
         // allow user to view their reading list
         if (navTo === 'viewList') {
            viewList()
            navTo = 'options'
        }
        
    }
    console.log('See you soon!')
}

app()