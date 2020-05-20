import React, { Component } from "react";
import "../components/SearchResults.css";
import BookCard from "../components/BookCard.js";

class SearchResults extends Component {
  render() {
    //console.log(this.props.searchResults);
    const searchResultsList = this.props.searchResults.map((book) => {
      return (
        <div key={book.isbn}>
          <BookCard
            book={book}
            lists={this.props.lists}
            onSaveToList={this.props.onSaveToList}
            onClickShareBook={this.props.onClickShareBook}
          />
        </div>
      );
    });

    return searchResultsList.length === 0 ? (
      <div className="allBooksFromSearchResultsOne">
        <p>Grab a book</p>
        <img src="/images/pulse.gif" alt="pulse-ani" />
      </div>
    ) : (
      <div className="allBooksFromSearchResultsTwo">{searchResultsList}</div>
    );
  }
}

export default SearchResults;
