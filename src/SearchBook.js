import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import DebounceInput from 'react-debounce-input'


/**
 * Represents a Search Books component feature
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
class SearchBook extends Component {

    static propTypes = {
        onFinishSearch: PropTypes.func.isRequired
    }

    state = {
        /**The query entered by the user to search for a book */
        query: '',
        /**The list of books which are currently stored in the shelfs*/
        myCurrentBooks: [],
        /**The list of books returned after searching using query value*/
        searchBooks: []
    }

    /**
     * Updates the state variables after updating query state
     * @param {string} query the query entered by the user
     * @public
     */
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

    /**
     * Retrieves all the books currently stored in the user´s shelf
     * @public
     */
    getAllMyBooks = () => {
        BooksAPI.getAll().then((myBooks) => {
            this.setState({ myCurrentBooks: myBooks })
        })
    }
    /**
     * Retrieves all the books matching the query
     * @param {string} query
     * @public
     */
    searchBooks = (query) => {
        BooksAPI.search(query).then((myBooks) => {
            this.setState({ searchBooks: myBooks.error ? [] : myBooks })
        })
    }
    /**
    * Updates the shelf of the book passed
    * @param {string} id the book id
    * @param {string} shelf the shelf name ["currently reading”, “want to read”, “read”, "none"]
    * @public
    */
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
            showingBooks.map((book, index) => { //Finding the current state of the books found
                const myBook = myCurrentBooks.find((myCurrentBook) => myCurrentBook.id === book.id)
                showingBooks[index].shelf = myBook ? myBook.shelf : 'none'
                return myBook
            })

        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={onFinishSearch}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput type="text" debounceTimeout={300} placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>

                <div className="search-books-results">
                    <div> {showingBooks.length < 1 || (<h6 className="bookshelf-size"> {showingBooks.length} book(s) </h6>)}</div>
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <Book
                                    id={book.id}
                                    backgroundImageURL={(book.imageLinks && book.imageLinks.smallThumbnail) ? (book.imageLinks.smallThumbnail) : 'http://via.placeholder.com/128x193?text=No%20Cover'}
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