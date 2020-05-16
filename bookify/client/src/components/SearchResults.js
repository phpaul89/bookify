import React, { Component } from "react";

class SearchResults extends Component {
  onClickSave = (event) => {
    this.props.onSaveToList(event.target.name);
  };

  onClickShare = (event) => {
    this.props.onClickShareBook(event.target.name);
  };

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
            onClick={this.onClickSave}
            value="Add to List"
            name={book.title}
          />
          <input
            type="button"
            onClick={this.onClickShare}
            value="Share"
            name={book.title}
          />
        </div>
      );
    });

    return <div className="allBooksFromSearchResults">{searchResultsList}</div>;
  }
}

export default SearchResults;
