import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

/**
 * Represents a Booksheld containing one or more Book Components
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
class Bookshelf extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    currentBooks: PropTypes.array.isRequired
  }

  state = {
  }

  render() {
    const { id, name, currentBooks, onBookMove } = this.props

    //Filtering only which belong to this shelf
    let showingBooks = currentBooks.filter((book) => book.shelf === id)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <h6 className="bookshelf-size"> {showingBooks.length} book(s) </h6>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  backgroundImageURL={(book.imageLinks && book.imageLinks.smallThumbnail) ? (book.imageLinks.smallThumbnail) : 'http://via.placeholder.com/128x193?text=No%20Cover'}
                  title={book.title}
                  shelf={book.shelf}
                  authors={book.authors ? book.authors : ['[No Author]']} onBookMove={onBookMove} />
              </li>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf