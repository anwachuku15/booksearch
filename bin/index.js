#!/usr/bin/env node
const readline = require('readline-sync')
const chalk = require('chalk')
const emoji = require('emojic')

const { greeting } = require('../UI/greeting')
const { showOptions } = require('../UI/options')
const { fetchBooks, addToList, viewList } = require('../actions')

const app = async () => {
    let navTo = 'greeting'
    while (navTo !== 'exit') {
        if (navTo === 'greeting') {
            greeting()
            navTo = 'query'
        }
        if (navTo === 'query') {
            const query = readline.question(`Search ${emoji.magRight}: `)
            const books = await fetchBooks(query)
            bookResults = books

            console.log('')
            let i = 1
            books.forEach(book => {
                console.log(`${i}. ` + chalk.white.italic.bold(`${book.title}`))
                console.log(`   ${book.author ? book.author.join(', ') : chalk.gray('unknown author(s)')}`)
                console.log(`   ${book.publisher ? book.publisher : chalk.gray('unknown publisher')}\n`)
                i++
            })
            console.log('---MENU---')
            showOptions()
            navTo = 'options'
        }
        if (navTo === 'options') {
            const option = readline.question('>> ')
            if (option === 's') {
                navTo = 'query'
            } else if (parseInt(option) > 0 && parseInt(option) < 6) {
                addToList(bookResults[option-1])
            } else if (option === 'l') {
                viewList()
            } else if (option === 'e') {
                navTo = 'exit'
            } else {
                console.log(`\n` + chalk.bold.red('Try again. Choose from one of the following options:') + `\n`)
            }
        }
    }
    console.log(chalk.cyan(`\nSee you soon! ${emoji.wave}\n`))
}

app()