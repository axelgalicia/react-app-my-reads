import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import ListBookshelfs from './ListBookshelfs'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [
      {
        title: "Keith Richards",
        subtitle: "The Biography",
        authors: [
          "Victor Bockris", "Axel"
        ],
        shelf: "currentlyReading",
        id: "A",
        imageLinks: {
          "smallThumbnail": "http://books.google.com/books/content?id=P_lzbHj_jS0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
        }
      },
      {
        title: "Keith Richards",
        subtitle: "The Biography",
        authors: [
          "Victor Bockris", "Axel"
        ],
        shelf: "wantToRead",
        id: "B",
        imageLinks: {
          "smallThumbnail": "http://books.google.com/books/content?id=P_lzbHj_jS0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
        }
      },
      {
        title: "Keith Richards",
        subtitle: "The Biography",
        authors: [
          "Victor Bockris"
        ],
        shelf: "read",
        id: "C",
        imageLinks: {
          "smallThumbnail": "http://books.google.com/books/content?id=P_lzbHj_jS0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
        }
      }

    ]
  }




  moveBook = (id, shelf) => {
    console.log('Moving ' + id + ' to ' + shelf);

    let bookArray = this.state.books.filter((book) => book.id === id)
    let bookUpdated

   
       bookUpdated = bookArray[0]
       bookUpdated.shelf = shelf
       this.setState((previousState) => ({
         books: previousState.books.filter((book)=> book.id != id).concat([bookUpdated])
       }))    

  }



  render() {

    console.log('RENDER App')
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBook currentBooks={this.state.books} />
        )} />

        <Route exact path="/" render={() => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <ListBookshelfs currentBooks={this.state.books} onBookMove={this.moveBook} />

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}
export default BooksApp