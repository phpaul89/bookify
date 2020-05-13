import React, { Component } from "react";
import BooksDummy from "../components/BooksDummy.json";
import "../components/BookList.css";
import axios from "axios";

class BookList extends Component {
  state = {
    isbnInput: "",
  };

  inputOnChange = (event) => {
    console.log(event.target.value);
    this.setState({ isbnInput: event.target.value });
  };

  isbnClick = () => {
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
      })
      .catch((error) => {
        console.log("Error calling axios: ", error);
      });
  };

  render() {
    const allBooks = BooksDummy.map((book) => {
      return (
        <div key={book.id} className="bookInList">
          <img src={book.imageUrl} alt={book.id} />
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>Published: {book.year}</p>
        </div>
      );
    });

    return (
      <div className="content">
        <div className="bookList">{allBooks}</div>
        <div className="showBookByISBN">
          <form>
            <input type="text" name="isbn" onChange={this.inputOnChange} />
            <input type="button" onClick={this.isbnClick} value="Get book" />
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
