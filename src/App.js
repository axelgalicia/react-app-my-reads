import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import ListBookshelfs from './ListBookshelfs'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllMyBooks()
    console.log('GET ALL')
  }

  getAllMyBooks = () => {
    console.log('GET ALL BOOKs')
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ books: myBooks })
    })
  }

  moveBook = (id, shelf) => {
    let bookUpdated = this.state.books.filter((book) => book.id === id)[0]
    bookUpdated.shelf = shelf
    //When none shelf is selected is deleted
    if (shelf === Bookshelf.shelfNames.none) {
      this.setState((previousState) => ({
        books: previousState.books.filter((book) => book.id !== id)
      }))
    } else {
      this.setState((previousState) => ({
        books: previousState.books.filter((book) => book.id !== id).concat([bookUpdated])
      }))
    }
  }

  render() {
    console.log('RENDER App')
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBook currentBooks={this.state.books} onFinishSearch={this.getAllMyBooks} />
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <Title />
            <ListBookshelfs currentBooks={this.state.books} onBookMove={this.moveBook} />
            <SearchButton />
          </div>
        )} />

      </div>
    )
  }
}


function Title() {
  return (
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
  )
}

function SearchButton() {
  return (
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  )
}


export default BooksApp