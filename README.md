# MyReads Project

This project allows you to keep track of which books you are currently reading, want to read or you already read. It displays the books in specific shelf depending on the book state. 

It is also possible to search for new books and add them to your shelf. Books state are being synchronized over the Internet using an existing REST API.

The main page displays your books and also contain the button to start searching for new books.


## Installation

To get started and use the application just follow the below steps:

* install all project dependencies with `npm install`
* start the server with `npm start` or `yarn start`

## How to use

 - After starting the application, you will be redirected to the main page containing all your default books for your bookshelf.
 - While in the main page, you can click on each book's menu to choose between shelves and move your books around.
 - In the right bottom corner you will find a ( + ) button which will redirect to the /search page. Here you can start typing and search for new books.
 - Note that while searching for new books and seeing results, if one of the books are already in your bookshelf it will indicate in which shelf belongs currently.

## Screenshots

### Main page
![Main page](https://github.com/axelgalicia/react-app-my-reads/blob/master/images/main_page.jpg)

### Search Page
![Search Page](https://github.com/axelgalicia/react-app-my-reads/blob/master/images/search_page.jpg)

**Author**: Axel Galicia, axelgalicia@gmail.com
Last Version: 1.0.0