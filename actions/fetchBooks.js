const fetch = require('node-fetch')
const chalk = require('chalk')
const ora = require('ora')

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

const apikey = 'AIzaSyDQWb5IluUsCJf5fHiRlVHlB_bbwLvsuHY'
const fetchBooks = async (query) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    const spinner = ora(`Searching for ${query}...`).start()
    try {
        const queryResponse = await fetch(`${url}${query}&maxResults=5&${apikey}`)
        const res = await queryResponse.json()
        spinner.stop()
        return bookConfig(res)
    } catch (err) {
        spinner.stop()
        throw (chalk.redBright.bold(err))
    }
}

module.exports = { bookConfig, fetchBooks }

