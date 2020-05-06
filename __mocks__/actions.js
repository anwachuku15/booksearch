const { apikey } = require('../apikey')

const url = 'https://www.googleapis.com/books/v1/volumes?q='


const bookConfig = (res) => {
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
}


const fetchBooks = (query) => {
    return Promise.resolve()
}

module.exports = { fetchBooks, bookConfig }