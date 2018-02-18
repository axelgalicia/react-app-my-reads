import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

/**
 * Represents a List of Bookshelfs components
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
class ListBookshelfs extends Component {

    render() {
        const { currentBooks, onBookMove } = this.props

        return (
            <div className="list-books-content">
                <Bookshelf name="Currently Reading" id="currentlyReading" currentBooks={currentBooks} onBookMove={onBookMove} />
                <Bookshelf name="Want to Read" id="wantToRead" currentBooks={currentBooks} onBookMove={onBookMove} />
                <Bookshelf name="Read" id="read" currentBooks={currentBooks} onBookMove={onBookMove} />
            </div>
        )
    }

}

ListBookshelfs.propTypes = {
    currentBooks: PropTypes.array.isRequired
}

export default ListBookshelfs