#!/usr/bin/env node
const term = require('terminal-kit').terminal
const chalk = require('chalk')
const boxen = require('boxen')
const readline = require('readline-sync')
const emoji = require('emojic')

const { fetchBooks, addToList, viewList } = require('../actions')

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
    console.log('Powered by ' + chalk.bold.blue('G')+chalk.bold.red('o')+chalk.bold.yellow('o')+chalk.bold.blue('g')+chalk.bold.green('l')+chalk.bold.red('e')+chalk.bold.blueBright(' Books'))
    term.bold.cyan("\nGo ahead and search for a book!\n\n")
}


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

            let i = 1
            console.log('')
            books.forEach(book => {
                console.log(`${i}. ` + chalk.italic.bold(`${book.title}`))
                console.log(`   ${book.author ? book.author.join(', ') : chalk.gray('unknown author(s)')}`)
                console.log(`   ${book.publisher ? book.publisher : chalk.gray('unknown publisher')}\n`)
                i++
            })
            navTo = 'options'
        }
        if (navTo === 'options') {
            console.log('---OPTIONS---')
            console.log(chalk.cyan('Enter the number') + chalk.cyan.bold(' [1-5] ') + chalk.cyan('of the book you\'d like to save to your reading list'))
            console.log(chalk.greenBright.bold('Enter [s]') + chalk.greenBright(' to find another book.'))
            console.log(chalk.blueBright.bold('Enter [l]') + chalk.blueBright(' to view your reading list.'))
            console.log(chalk.red.bold('Enter [e]') + chalk.red(' to exit.'))
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