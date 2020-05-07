const { bookConfig } = require('../actions/fetchBooks')

const fetchResults = {
    items: [
        {
            volumeInfo: {
                title: 'Fantastic Beasts and Where to Find Them',
                authors: [ 'J.K. Rowling', 'Newt Scamander' ],
                publisher: 'Pottermore Publishing'
            }
        },
    ]
}
const book = {
    title: 'Fantastic Beasts and Where to Find Them',
    author: [ 'J.K. Rowling', 'Newt Scamander' ],
    publisher: 'Pottermore Publishing' 
}

describe('bookConfig', () => {
    it('should reformat fetched results', () => {
        const firstBook = bookConfig(fetchResults)[0]
        expect(firstBook).toMatchObject(book)
    })
})

