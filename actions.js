const fetch = require('node-fetch')
const { apikey } = require('./apikey')

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
}

const viewList = () => {
    bookResults.forEach(book => {
        console.log(`${book.title}\n${book.author}\n${book.publisher}\n`)
    })
}

module.exports = { fetchBooks, addToList, viewList }