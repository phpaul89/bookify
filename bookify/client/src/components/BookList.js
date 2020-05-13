import React, { Component } from "react";
import BooksDummy from "../components/BooksDummy.json";
import "../components/BookList.css";

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
            <input type="button" onClick={this.isbnClick} value="Show book" />
          </form>
        </div>
        <div className="comment">
          This page shows how to access database information (JSON) in frontend.
        </div>
      </div>
    );
  }
}

export default BookList;
