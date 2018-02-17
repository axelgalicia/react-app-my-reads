import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {


    render() {
        console.log('RENDER Book')

        const { id, backgroundImageURL, title, authors, shelf, onBookMove } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImageURL})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={(event) => onBookMove(id, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{
                    authors.toString()
                }</div>
            </div>
        )
    }

}

Book.propTypes = {
    backgroundImageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired
}

export default Book

