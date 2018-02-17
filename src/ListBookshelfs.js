import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class ListBookshelfs extends Component {



    componentWillReceiveProps(nextProps) {
        console.log('WILL RECEIVE PROPS');
    }

    render() {
        console.log('RENDER ListBookshelfs')
        const { currentBooks, onBookMove } = this.props

        return (
            <div className="list-books-content">

                <Bookshelf name="Currently Reading" id="currentlyReading" currentBooks={currentBooks} onBookMove={(id, shelf) => onBookMove(id, shelf)} />
                <Bookshelf name="Want to Read" id="wantToRead" currentBooks={currentBooks} onBookMove={(id, shelf) => onBookMove(id, shelf)} />
                <Bookshelf name="Read" id="read" currentBooks={currentBooks} onBookMove={(id, shelf) => onBookMove(id, shelf)} />

            </div>
        )
    }

}

ListBookshelfs.propTypes = {
    currentBooks: PropTypes.array.isRequired
}

export default ListBookshelfs