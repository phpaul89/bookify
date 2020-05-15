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
    const isbn = this.state.searchQuery;

    // make an API call and pass returned JSON and 'isbn' to parent 'Dashboard'
    axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
      )
      .then((bookJSON) => {
        this.props.searchResults(bookJSON, isbn);
      })
      .catch((error) => {
        console.log("Error calling axios at inputClick: ", error);
      });
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
