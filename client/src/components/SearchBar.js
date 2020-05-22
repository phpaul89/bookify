import React, { Component } from "react";
import axios from "axios";

class SearchBar extends Component {
  state = {
    searchQuery: "",
  };

  inputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  inputClick = () => {
    const query = this.state.searchQuery.replace(/\s/g, "+");

    //reset result list in LoggedIn.js:
    this.props.updateSearchResults("", "reset");

    // check for ISBN-13 format
    if (query.length === 13 && query.charAt(0) === "9") {
      //console.log("isbn: ", query);
      let isbn = query;

      // make an API call and pass returned JSON and 'isbn' to parent 'Dashboard'
      axios
        .get(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
        )
        .then((bookJSON) => {
          console.log("axios call from SearchBar: ", bookJSON);
          this.props.updateSearchResults(bookJSON, isbn);
        })
        .catch((error) => {
          console.log("Error calling axios at inputClick: ", error);
        });
      // check for text input:
    } else {
      axios
        .get(`https://openlibrary.org/search.json?title=${query}`)
        .then((booksJSON) => {
          const onlyFiveISBN = booksJSON.data.docs
            .slice(0, 3)
            .map((book) =>
              book.isbn.find((number) => number.toString().length === 13)
            );

          if (onlyFiveISBN.length === 0) {
            console.log("Cannot find books");
          } else {
            for (let isbn of onlyFiveISBN) {
              axios
                .get(
                  `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
                )
                .then((bookJSON) => {
                  console.log("axios call from SearchBar: ", bookJSON);
                  this.props.updateSearchResults(bookJSON, isbn);
                })
                .catch((error) => {
                  console.log("Error calling axios at inputClick: ", error);
                });
            }
          }
        })
        .catch((error) => {
          console.log("error axios call: ", error);
        });
    }
  };

  render() {
    return (
      <form>
        <input type="text" name="isbn" onChange={this.inputChange} />
        <input type="button" onClick={this.inputClick} value="Get book" />
      </form>
    );
  }
}

export default SearchBar;
