const { fetchBooks } = require('../actions')

const query = 'harrypotter'
describe('fetchBooks', () => {
    it('should return an array of books', () => {
        fetchBooks(query)
            .then(res => {
                expect(res[0].title).toBe('Fantastic Beasts and Where to Find Them')
            })
            .catch(err => {
                throw err
            })
    })
})