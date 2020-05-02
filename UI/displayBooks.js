const chalk = require('chalk')


const displayBooks = (books) => {
    let i = 1
    books.forEach(book => {
        console.log(`${i}. ` + chalk.white.italic.bold(`${book.title}`))
        console.log(`   ${book.author ? book.author.join(', ') : chalk.gray('unknown author(s)')}`)
        console.log(`   ${book.publisher ? book.publisher : chalk.gray('unknown publisher')}\n`)
        i++
    })
}



module.exports = { displayBooks }