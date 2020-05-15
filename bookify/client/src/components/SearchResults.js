import React, { Component } from "react";

class SearchResults extends Component {
  render() {
    const searchResultsList = this.props.searchResults.map((book) => {
      return (
        <div key="" className="bookInSearchResultsList">
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

    return <div className="allBooksFromSearchResults">{searchResultsList}</div>;
  }
}

export default SearchResults;
