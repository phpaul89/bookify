import React, { Component } from "react";
import "../components/RandomBooks.css";
import axios from "axios";

class RandomBooks extends Component {
  refreshRandomList = (event) => {
    this.props.updateSearchResults("", "reset");

    const bookISBNArr = event.target.getAttribute("isbn");
    const isbn = bookISBNArr
      .split(",")
      .find((number) => number.toString().length === 13);

    // make an API call and pass returned JSON and 'isbn' to parent 'Dashboard'
    axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
      )
      .then((bookJSON) => {
        console.log("axios call from RandomBooks: ", bookJSON);
        this.props.updateSearchResults(bookJSON, isbn);
        this.props.refreshRandomList(bookJSON.data[`ISBN:${isbn}`].title);
      })
      .catch((error) => {
        console.log("Error calling axios at refreshRandomList: ", error);
      });
  };

  render() {
    const randomList = this.props.randomList.slice(0, 3).map((book) => {
      return (
        <p
          key={book.isbn}
          className="randomBook"
          onClick={this.refreshRandomList}
          title={book.title}
          isbn={book.isbn}
        >
          {book.title}
        </p>
      );
    });
    return (
      <div className="randomBookTile">
        <div className="randomFeature">
          <p>Featured: Michael Lewis</p>
        </div>
        <div className="randomBookList">
          <div className="randomThreeBooks">{randomList}</div>
        </div>
      </div>
    );
  }
}

export default RandomBooks;
