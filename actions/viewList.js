const chalk = require('chalk')
const path = require('path')
const { readDataInReadingListFile } = require('./addToList')

const { displayBooks } = require('../UI/displayBooks')

const viewList = () => {
    console.log('\n'+chalk.bold.underline.blue('My Reading List'))
    try {
        let readingListData = readDataInReadingListFile(path.join(__dirname + '/../my-reading-list.json'))
        
        if (readingListData.books.length > 0) {
            displayBooks(readingListData.books)
        } else {
            console.log('Your list is empty!\n')
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = { viewList }