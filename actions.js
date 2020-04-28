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
    bookResults.push(book)
    console.log('You added ' + chalk.italic.bold(`${book.title}`) + ` to your list. ${confirmations[rnd]}\n`)
}

const confirmations = [
    'Good choice!',
    'Great book!',
    'Enjoy!',
    'That\'s a good one!'
]
const rnd = Math.floor(Math.random() * 4)

const viewList = () => {
    if (bookResults.length > 0) {
        bookResults.forEach(book => {
            console.log(`${book.title}\n${book.author}\n${book.publisher}\n`)
        })
    } else {
        console.log('Your list is empty!\n')
    }
    
}



module.exports = { fetchBooks, addToList, viewList }