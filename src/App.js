import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import ListBookshelfs from './ListBookshelfs'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllMyBooks()
  }

  getAllMyBooks = () => {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ books: myBooks })
    })
  }

  moveBook = (id, shelf) => {
    BooksAPI.update({ id: id }, shelf).then((myBooks) => {
      this.getAllMyBooks()
    })
  }

  render() {
    return (
      <div className="app">
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