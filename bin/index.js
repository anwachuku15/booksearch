#!/usr/bin/env node
const readline = require('readline-sync')
const chalk = require('chalk')
const emoji = require('emojic')

const { greeting } = require('../UI/greeting')
const { showOptions } = require('../UI/options')
const { displayBooks } = require('../UI/displayBooks')
const { fetchBooks } = require('../actions/fetchBooks')
const { addToList } = require('../actions/addToList')
const { viewList } = require('../actions/viewList')


const app = async () => {
    let navTo = 'greeting'
    while (navTo !== 'exit') {
        if (navTo === 'greeting') {
            greeting()
            navTo = 'query'
        }
        
        if (navTo === 'query') {
            const query = readline.question(`Search ${emoji.magRight}: `)
            try {
                const books = await fetchBooks(query)
                bookResults = books
                console.log('')
                displayBooks(books)
                
                console.log('---MENU---')
                showOptions()
                navTo = 'options'
            } catch (err) {
                console.log(err)
            }
        }

        if (navTo === 'options') {
            const option = readline.question('>> ')
            if (option === 's') {
                navTo = 'query'
            } else if (parseInt(option) > 0 && parseInt(option) < 6) {
                addToList(bookResults[option-1])
                navTo = 'options'
            } else if (option === 'l') {
                viewList()
                navTo = 'options'
            } else if (option === 'e') {
                navTo = 'exit'
            } else {
                console.log(`\n` + chalk.bold.red('Try again. Choose from one of the following options:') + `\n`)
                showOptions()
            }
        }
    }
    console.log(chalk.cyan(`\nSee you soon! ${emoji.wave}\n`))
}

app()