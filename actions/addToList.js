const fs = require('fs')
const path = require('path')
const util = require('util')
const chalk = require('chalk')

const readDataInReadingListFile = (path) => {
    const data = fs.readFileSync(path, 'utf-8')
    return JSON.parse(data)
}

const addToReadingListFile = (path, data) => {
    fs.writeFileSync(path, data)
}

const addToList = (book) => {
    try {
        let readingListData = readDataInReadingListFile(path.join(__dirname + '/../my-reading-list.json'))
        if (readingListData.books.some(exists => exists.title === book.title && util.inspect(exists.author) === util.inspect(book.author))) {
            console.log("You've already added this book to your list.\n")
        } else {
            readingListData.books.push(book)
            try {
                addToReadingListFile(path.join(__dirname + '/../my-reading-list.json'), JSON.stringify(readingListData))
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

module.exports = { addToList, readDataInReadingListFile }