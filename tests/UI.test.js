
const { greeting, msgBox } = require('../UI/greeting')
const { showOptions, chooseBookOption, exitOption } = require('../UI/options')
const { displayBooks, title, author, publisher } = require('../UI/displayBooks')

const spy = jest.spyOn(global.console, 'log')

describe('greeting', () => {
    it('should console log the greeting message', () => {
        greeting()
        expect(spy).toHaveBeenCalledWith(msgBox)
    })
})

describe('showOptions', () => {
    it('should console log menu options', () => {
        showOptions()
        expect(spy).toHaveBeenCalledWith(chooseBookOption)
        expect(spy).toHaveBeenLastCalledWith(exitOption)
    })
})

const books = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: ['J.K. Rowling'],
        publisher: 'Arthur A. Levin Books'
    },
    {
        title: 'Daniel, First Maccabees, Second Maccabees',
        author: ['John Joseph Collins']
    },
    {
        title: 'Who In The World Wrote This Book?',
        publisher: 'Mystery Publishing'
    }
]

describe('displayBooks', () => {
    let num = 1
    beforeEach(() => {
        displayBooks(books)
    })
    it('should console log the title of the book with its number in the list', () => {
        expect(spy).toHaveBeenCalledWith(title(num, books[0]))
        num++
    })
    it('should console log the author of the book (log "unknown author" if the author is not included', () => {
        expect(spy).toHaveBeenCalledWith(author(books))
    })
    it('should console log the publisher ("unknown publisher" if the publisher is not included)', () => {
        expect(spy).toHaveBeenCalledWith(publisher(books))
    })
})



