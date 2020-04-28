#!/usr/bin/env node
const term = require('terminal-kit').terminal
const chalk = require('chalk')
const boxen = require('boxen')
const readline = require('readline-sync')


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
            navTo = 'addToList'
        }
        // allow user to add a book to their reading list
        if (navTo === 'addToList') {
            const selectedBook = readline.question("Enter the number of the book you'd like to add to your reading list.")
            const bookChoice = parseInt(selectedBook)
            bookChoice > 0 && bookChoice < 6 
                ? addToList(bookResults[bookChoice-1]) // add method to actions.js
                : console.log('Try again. Please enter a number between 1 and 5.'); navTo==='addToList'
            navTo = 'viewList'
        }
        // allow user to view their reading list
        if (navTo === 'viewList') {
            viewList()
            navTo = 'query'
        }
        // allow user to exit app -- exit out of while loop
        if (navTo === 'menu') {
            console.log('almost done... refactor')
        }
    }


            

            

            
}

app()