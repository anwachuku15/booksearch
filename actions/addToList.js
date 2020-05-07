const fs = require('fs')
const path = require('path')
const util = require('util')
const chalk = require('chalk')

const getPathToReadingList = () => path.join(__dirname + '/../my-reading-list.json')
const readDataInReadingList = (path) => fs.readFileSync(path, 'utf-8')


const addToList = (book) => {
    try {
        const data = readDataInReadingList(getPathToReadingList())
        let readingListData = JSON.parse(data)
        if (readingListData.books.some(exists => exists.title === book.title && util.inspect(exists.author) === util.inspect(book.author))) {
            console.log("You've already added this book to your list.\n")
        } else {
            readingListData.books.push(book)
            try {
                const data = fs.writeFileSync(getPathToReadingList(), JSON.stringify(readingListData))
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

module.exports = { addToList }