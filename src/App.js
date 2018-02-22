import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import ListBookshelfs from './ListBookshelfs'
import ErrorPage404 from './ErrorPage404'
import './App.css'

/**
 * The main component to display all shelfs of MyReads App
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllMyBooks()
  }

  /**
   * Retrieves all the books already stored
   * @public
   */
  getAllMyBooks = () => {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ books: myBooks })
    })
  }

  /**
   * Updates the shelf of the book passed
   * @param {string} id the book id
   * @param {string} shelf the shelf name ["currently reading”, “want to read”, “read”, "none"]
   * @public
   */
  moveBook = (id, shelf) => {
    BooksAPI.update({ id: id }, shelf).then((myBooks) => {
      this.getAllMyBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/search" render={() => (
            <SearchBook onFinishSearch={this.getAllMyBooks} />
          )} />

          <Route exact path="/" render={() => (
            <div className="list-books">
              <Title />
              <ListBookshelfs currentBooks={this.state.books} onBookMove={this.moveBook} />
              <SearchButton />
            </div>
          )} />

          <Route component={ErrorPage404} />
        </Switch>
      </div>
    )
  }
}

/**
 * The title of the page
 */
function Title() {
  return (
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
  )
}

/**
 * A Button which redirects to /search
 */
function SearchButton() {
  return (
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  )
}


export default BooksApp