import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {

  state = {
  }

  render() {

    console.log('RENDER Bookshelf')

    const { id, name, currentBooks, onBookMove } = this.props

    //Filtering only which belong to this shelf
    let showingBooks = currentBooks.filter((book) => book.shelf === id)

    console.log(showingBooks)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  backgroundImageURL={book.imageLinks.smallThumbnail}
                  title={book.title}
                  shelf={book.shelf}
                  authors={book.authors} onBookMove={(id, shelf) => onBookMove(id, shelf)} />
              </li>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currentBooks: PropTypes.array.isRequired
}

export default Bookshelf