import React, { Component } from "react";
import BooksDummy from "../components/BooksDummy.json";
import "../components/BookList.css";
import axios from "axios";

class BookList extends Component {
  state = {
    isbnInput: "",
    userBooks: [],
    userBooksFromDb: [],
  };

  inputChange = (event) => {
    this.setState({ isbnInput: event.target.value });
  };

  inputClick = () => {
    const isbn = this.state.isbnInput;

    // add book to state:
    axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
      )
      .then((bookJSON) => {
        this.setState({
          // correct way to push into state property array: instead of '.push' using spread operator
          userBooks: [
            ...this.state.userBooks,
            {
              title: bookJSON.data[`ISBN:${isbn}`].title,
              cover: bookJSON.data[`ISBN:${isbn}`].cover,
              by_statement: bookJSON.data[`ISBN:${isbn}`]["by_statement"],
              publish_date: bookJSON.data[`ISBN:${isbn}`]["publish_date"],
              url: bookJSON.data[`ISBN:${isbn}`].url,
            },
          ],
        });
      })
      .catch((error) => {
        console.log("Error calling axios: ", error);
      });
  };

  // delete book from database
  deleteBook = (event) => {
    axios.delete(`/dashboard/deletebooks/${event.target.name}`);

    this.setState({
      userBooks: this.state.userBooks.filter((book) => {
        return book.title !== event.target.name;
      }),
    });
  };

  saveBook = (event) => {
    // read: find me the object inside the userBooks state property which matches with the book title of the item i'm clicking on:
    const bookObjectToBeAdded = this.state.userBooks.find((book) => {
      return book.title === event.target.name;
    });

    axios.post("/dashboard/savebook", bookObjectToBeAdded);
  };

  // DATABASE scenario:
  componentDidMount() {
    this.getBooksFromDb();
  }

  getBooksFromDb = () => {
    axios
      .get("/dashboard/getbooks")
      .then((allBooksFromDb) => {
        const allBooksData = allBooksFromDb.data;
        this.setState({
          userBooksFromDb: allBooksData,
        });
      })
      .catch((error) => {
        console.log("error getting books from database in frontend: ", error);
      });
  };

  render() {
    // all 3 can be refactored as a single component, which gets different props passed depending on source (JSON, state, database)
    const allBooksList = BooksDummy.map((book) => {
      return (
        <div key={book.id} className="bookInList">
          <img src={book.imageUrl} alt={book.id} />
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>Published: {book.year}</p>
        </div>
      );
    });

    // state.userBooks gets resetted after page reload -> connection to database for permanent storage needed
    const userBooksList = this.state.userBooks.map((book) => {
      return (
        <div key="" className="bookInList">
          <img
            src={book.cover.medium} // error when no cover available
            alt=""
          />
          <p>Title: {book.title}</p>
          <p>Authored: {book["by_statement"]}</p>
          <p>Published: {book["publish_date"]}</p>
          <a href={book.url}>Details</a>
          <br />
          <br />
          <input
            type="button"
            onClick={this.removeBook}
            value="Remove"
            name={book.title}
          />
          <input
            type="button"
            onClick={this.saveBook}
            value="Add"
            name={book.title}
          />
        </div>
      );
    });

    const userBooksFromDb = this.state.userBooksFromDb.map((book) => {
      return (
        <div key={book.title} className="bookInDbList">
          <p>from database:</p>
          <img src={book.cover.medium} alt="" />
          <p>Title: {book.title}</p>
          <p>Authored: {book["by_statement"]}</p>
          <p>Published: {book["publish_date"]}</p>
          <a href={book.url}>Details</a>
          <br />
          <br />
          <input
            type="button"
            onClick={this.removeBookFromDb}
            value="Remove"
            name={book.title}
          />
          <input
            type="button"
            onClick={this.deleteBook}
            value="Delete"
            name={book.title}
          />
        </div>
      );
    });

    return (
      <div className="content">
        <div className="booksList">{allBooksList}</div>
        <div className="userBooksList">{userBooksList}</div>
        <div className="userBooksFromDbList">{userBooksFromDb}</div>
        <div className="showBookByISBN">
          <form>
            <input type="text" name="isbn" onChange={this.inputChange} />
            <input type="button" onClick={this.inputClick} value="Get book" />
          </form>
        </div>
        <div className="comment">
          This page shows how to access local (dummy list) and external (Open
          Library API) database information in frontend.
        </div>
      </div>
    );
  }
}

export default BookList;
