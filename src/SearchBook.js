import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'



class SearchBook extends Component {

    static propTypes = {
        currentBooks: PropTypes.array.isRequired
    }

    state = {
        query: '',
        searchBooks: []
    }

    updateQuery = (query) => {

        this.setState({ query: query })
        if (query) {
            this.searchBooks(query);
        } else {
            this.setState({ searchBooks: [] })
        }

    }

    searchBooks = (query) => {
        BooksAPI.search(query).then((myBooks) => {
            this.setState({ searchBooks: myBooks.error ? [] : myBooks })
        })
    }

    updateBook = (id, shelf) => {
        BooksAPI.update({ id: id }, shelf).then((myBooks) => {
            this.setState()
        })
    }

    componentDidMount() {
        console.log('DID MOUNT')
        this.setState()
    }


    render() {

        console.log('Render SearchBook')

        const { currentBooks, onFinishSearch } = this.props
        const { query, searchBooks } = this.state

        let showingBooks = searchBooks
        console.log(searchBooks.length)

        if (!query || !showingBooks || showingBooks.length < 1) {
            showingBooks = []
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^ NO QUERY ^^^^^^^^^^^^^^^^^^^^^^^^^')
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={onFinishSearch}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <Book
                                    id={book.id}
                                    backgroundImageURL={(book.imageLinks && book.imageLinks.smallThumbnail) ? (book.imageLinks.smallThumbnail) : ''}
                                    title={book.title}
                                    shelf={book.shelf ? book.shelf : Bookshelf.shelfNames.none }
                                    authors={book.authors ? book.authors : ['[No Author]']} onBookMove={this.updateBook} />
                            </li>
                        ))}

                    </ol>
                </div>
            </div>
        )

    }


}


export default SearchBook