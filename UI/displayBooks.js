const chalk = require('chalk')

const title = (i, book) => `${i}. ` + chalk.white.italic.bold(`${book.title}`)
const author = (book) => `   ${book.author ? book.author.join(', ') : chalk.gray('unknown author(s)')}`
const publisher = (book) => `   ${book.publisher ? book.publisher : chalk.gray('unknown publisher')}\n`

const displayBooks = (books) => {
    let i = 1
    books.forEach(book => {
        console.log(title(i, book))
        console.log(author(book))
        console.log(publisher(book))
        i++
    })
}



module.exports = { displayBooks, title, author, publisher }