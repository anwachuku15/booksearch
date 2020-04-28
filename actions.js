const fetch = require('node-fetch')
const { apikey } = require('./apikey')
const chalk = require('chalk')

const fetchBooks = async (query) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    const queryResponse = await fetch(`${url}${query}&maxResults=5&${apikey}`)
                       .then(res => {
                           return res.json()
                       })
    const books = []
    queryResponse.items.forEach(item => {
        const book = {
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors,
            publisher: item.volumeInfo.publisher
        }
        books.push(book)
    })
    return books
}

let bookResults = []
const addToList = (book) => {
    if (bookResults.some(exists => exists.title === book.title && exists.author === book.author)) {
        console.log("You've already added this book to your list.\n")
    } else {
        bookResults.push(book)
        console.log('\nYou added ' + chalk.italic.bold(`${book.title}`) + ` to your list. ${confirmations[rnd]}\n`)
    }
}
const confirmations = [
    'Good choice!',
    'Great book!',
    'Enjoy!',
    'That\'s a good one!'
]
const rnd = Math.floor(Math.random() * 4)

const viewList = () => {
    console.log('\n'+chalk.bold.underline.blue('My Reading List'))
    if (bookResults.length > 0) {
        bookResults.forEach(book => {
            console.log(chalk.white.italic.bold(`${book.title}`))
            console.log(`${book.author ? book.author.join(', ') : chalk.gray('unknown author(s)')}`)
            console.log(`${book.publisher ? book.publisher : chalk.gray('unknown publisher')}\n`)
        })
    } else {
        console.log('Your list is empty!\n')
    }
}



module.exports = { fetchBooks, addToList, viewList }