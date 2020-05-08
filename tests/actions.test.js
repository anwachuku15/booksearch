jest.mock("fs", () => ({
    readFileSync: jest.fn()
}))
const fs = require('fs')
const { readDataInReadingListFile } = require('../actions/addToList')
const { bookConfig } = require('../actions/fetchBooks')

describe('readDataInReadingList', () => {
    it('should return the parsed JSON from a file specified as param', () => {
        fs.readFileSync.mockReturnValue('{ "books":[{"title":"Fantastic Beasts and Where to Find Them","author":["J.K. Rowling","Newt Scamander"],"publisher":"Pottermore Publishing"}] }')
        const result = readDataInReadingListFile("test.json")
        expect(result).toEqual({ books:[{title:'Fantastic Beasts and Where to Find Them',author:["J.K. Rowling","Newt Scamander"],publisher:"Pottermore Publishing"}] })
    })
})


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

