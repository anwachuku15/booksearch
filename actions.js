const fs = require('fs')
const path = require('path')
const util = require('util')
const fetch = require('node-fetch')
const chalk = require('chalk')
const { apikey } = require('./apikey')
const { displayBooks } = require('./UI/displayBooks')

// Searching UX
// Sever request timeout
const fetchBooks = async (query) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    try {
        const queryResponse = await fetch(`${url}${query}&maxResults=5&${apikey}`)
        const res = await queryResponse.json()

        const books = []
        if (!res.error) {
            res.items.forEach(item => {
                const book = {
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors,
                    publisher: item.volumeInfo.publisher
                }
                books.push(book)
            })
            return books
        } else {
            throw new Error(chalk.redBright.bold('Google Books API Error: ' + res.error.message))
        }
    } catch (err) {
        throw (chalk.redBright.bold(err))
    }
}

const addToList = (book) => {
    try {
        const data = fs.readFileSync(path.join(__dirname + '/my-reading-list.json'), 'utf-8')
        let readingListData = JSON.parse(data)
        if (readingListData.books.some(exists => exists.title === book.title && util.inspect(exists.author) === util.inspect(book.author))) {
            console.log("You've already added this book to your list.\n")
        } else {
            readingListData.books.push(book)
            try {
                const data = fs.writeFileSync(path.join(__dirname + '/my-reading-list.json'), JSON.stringify(readingListData))
                let rnd = Math.floor(Math.random() * 4)
                console.log(
                    '\nYou added ' + 
                    chalk.white.italic.bold(`${book.title}`) + 
                    ` to your list. ${confirmations[rnd]}\n`
                )
            } catch (err) {
                console.error(err)
            }
        }
    } catch (err) {
        console.error(err)
    }
}
const confirmations = [
    'Good choice!',
    'Great book!',
    'Enjoy!',
    'That\'s a good one!'
]

const viewList = () => {
    console.log('\n'+chalk.bold.underline.blue('My Reading List'))
    try {
        const data = fs.readFileSync(path.join(__dirname + '/my-reading-list.json'), 'utf-8')
        let readingListData = JSON.parse(data)
        
        if (readingListData.books.length > 0) {
            displayBooks(readingListData.books)
        } else {
            console.log('Your list is empty!\n')
        }
    } catch (err) {
        console.error(err)
    }
}



module.exports = { fetchBooks, addToList, viewList }