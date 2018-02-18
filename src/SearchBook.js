import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'



class SearchBook extends Component {

    static propTypes = {
        onFinishSearch: PropTypes.func.isRequired
    }

    state = {
        query: '',
        myCurrentBooks: [],
        searchBooks: []
    }

    updateQuery = (query) => {

        if (query) {
            this.setState({ query: query })
            this.searchBooks(query);
            this.getAllMyBooks()
        } else {
            this.setState({
                query: query,
                searchBooks: [],
                myCurrentBooks: []
            })
        }
    }

    getAllMyBooks = () => {
        BooksAPI.getAll().then((myBooks) => {
            this.setState({ myCurrentBooks: myBooks })
        })
    }

    searchBooks = (query) => {
        BooksAPI.search(query).then((myBooks) => {
            this.setState({ searchBooks: myBooks.error ? [] : myBooks })
        })
    }

    updateBook = (id, shelf) => {
        BooksAPI.update({ id: id }, shelf).then((myBooks) => {
            this.getAllMyBooks()
        })
    }

    render() {

        const { onFinishSearch } = this.props
        const { query, searchBooks, myCurrentBooks } = this.state

        let showingBooks = searchBooks

        if (!query) {
            showingBooks = []
        } else {
            showingBooks.map((book, index) => {
                const myBook = myCurrentBooks.find((myCurrentBook) => myCurrentBook.id === book.id)
                if (myBook) {
                    showingBooks[index].shelf = myBook.shelf
                }
                return myBook
            })

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
                                    shelf={book.shelf ? book.shelf : 'none'}
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