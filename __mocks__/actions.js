jest.mock('../actions')

const { apikey } = require('../apikey')

const url = 'https://www.googleapis.com/books/v1/volumes?q='

const fetchResults = {
    items: [
        {
            title: 'Fantastic Beasts and Where to Find Them',
            author: [ 'J.K. Rowling', 'Newt Scamander' ],
            publisher: 'Pottermore Publishing'
        }
    ]
}

const fetchBooks = (query) => {
    return Promise.resolve(fetchResults)
}

module.exports = { fetchBooks }