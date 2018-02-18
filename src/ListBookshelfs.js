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