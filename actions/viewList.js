const fs = require('fs')
const path = require('path')
const chalk = require('chalk')


const { displayBooks } = require('../UI/displayBooks')

const viewList = () => {
    console.log('\n'+chalk.bold.underline.blue('My Reading List'))
    try {
        const data = fs.readFileSync(path.join(__dirname + '/../my-reading-list.json'), 'utf-8')
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

module.exports = { viewList }