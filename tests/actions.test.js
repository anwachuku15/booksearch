jest.mock('../actions')
const { bookConfig, fetchBooks } = require('../actions')

const query = 'harrypotter'
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


// describe('fetchBooks', () => {
//     it('should return an array of books', () => {
//         expect.assertions(1)
//         fetchBooks(query).then(res => {
//             console.log(res)
//             expect(res[0]).toBe('Fantastic Beasts and Where to Find Them')
//         })
//     })
// })