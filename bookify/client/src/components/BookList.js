import React, { Component } from "react";
import BooksDummy from "../components/BooksDummy.json";
import "../components/BookList.css";
import axios from "axios";

class BookList extends Component {
  state = {
    isbnInput: "",
    userBooks: [],
  };

  inputOnChange = (event) => {
    console.log(event.target.value);
    this.setState({ isbnInput: event.target.value });
  };

  inputClick = () => {
    console.log("ISBN from input: ", this.state.isbnInput);
    const isbn = this.state.isbnInput;

    axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
      )
      .then((bookJSON) => {
        console.log(bookJSON.data[`ISBN:${isbn}`]);
        console.log(bookJSON.data[`ISBN:${isbn}`].title);
        console.log(bookJSON.data[`ISBN:${isbn}`]["publish_date"]);
        console.log("Current userBooks property: ", this.state.userBooks);
        this.setState({
          // correct way to push into state property array instead of '.push' using spread operator
          userBooks: [
            ...this.state.userBooks,
            {
              title: bookJSON.data[`ISBN:${isbn}`].title,
              cover: bookJSON.data[`ISBN:${isbn}`].cover,
              by_statement: bookJSON.data[`ISBN:${isbn}`]["by_statement"],
              publish_date: bookJSON.data[`ISBN:${isbn}`]["publish_date"],
            },
          ],
        });
        console.log("New userBooks property: ", this.state.userBooks);
      })
      .catch((error) => {
        console.log("Error calling axios: ", error);
      });
  };

  render() {
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
          <img src={book.cover.medium} alt="" />
          <p>Title: {book.title}</p>
          <p>Authored: {book["by_statement"]}</p>
          <p>Published: {book["publish_date"]}</p>
        </div>
      );
    });

    return (
      <div className="content">
        <div className="booksList">{allBooksList}</div>
        <div className="userBooksList">{userBooksList}</div>
        <div className="showBookByISBN">
          <form>
            <input type="text" name="isbn" onChange={this.inputOnChange} />
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
