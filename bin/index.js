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
    borderColor: 'red',
    backgroundColor: 'cyan'
}

const greeting = () => {
    const greetingMsg = chalk.red('Welcome to Your Book Club!')
    const msgBox = boxen(greetingMsg, styles)
    console.log(msgBox)
    console.log('Powered by ' + chalk.bold.blue('G')+chalk.bold.red('o')+chalk.bold.yellow('o')+chalk.bold.blue('g')+chalk.bold.green('l')+chalk.bold.red('e')+chalk.bold.blueBright(' Books'))
    term.bold.cyan("\nGo ahead and search for a book!\n\n")
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
                // Edge cases: 
                // some authors/publisher data is undefined
                // reformat book.authors to consider multiple authors
                console.log(`${i}. ` + chalk.italic.bold(`${book.title}`))
                console.log(`   ${book.author ? book.author.join(', ') : chalk.gray('unknown author(s)')}`)
                console.log(`   ${book.publisher ? book.publisher : chalk.gray('unknown publisher')}\n`)
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
                // navTo = 'options'
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