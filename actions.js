const fs = require('fs')
const path = require('path')
const util = require('util')

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


const addToList = (book) => {
    try {
        console.log(__dirname)
        console.log(process.cwd())
        
        const data = fs.readFileSync('./bin/my-reading-list.json', 'utf-8')
        let readingListData = JSON.parse(data)
        if (readingListData.books.some(exists => exists.title === book.title && util.inspect(exists.author) === util.inspect(book.author))) {
            console.log("You've already added this book to your list.\n")
        } else {
            readingListData.books.push({
                title: book.title,
                author: book.author,
                publisher: book.publisher
            })
            try {
                const data = fs.writeFileSync('./bin/my-reading-list.json', JSON.stringify(readingListData))
                let rnd = Math.floor(Math.random() * 4)
                console.log(
                    '\nYou added ' + 
                    chalk.italic.bold(`${book.title}`) + 
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
        const data = fs.readFileSync('./bin/my-reading-list.json', 'utf-8')
        let readingListData = JSON.parse(data)
        
        if (readingListData.books.length > 0) {
            readingListData.books.forEach(book => {
                console.log(chalk.white.italic.bold(`${book.title}`))
                console.log(`${book.author ? book.author.join(', ') : chalk.gray('unknown author(s)')}`)
                console.log(`${book.publisher ? book.publisher : chalk.gray('unknown publisher')}\n`)
            })
        } else {
            console.log('Your list is empty!\n')
        }
    } catch (err) {
        console.error(err)
    }
}



module.exports = { fetchBooks, addToList, viewList }