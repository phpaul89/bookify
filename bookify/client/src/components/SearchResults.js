import React, { Component } from "react";
import "../components/SearchResults.css";
import BookCard from "../components/BookCard.js";
import FollowerCard from "../components/FollowerCard.js";

class SearchResults extends Component {
  render() {
    //console.log(this.props.searchResults);
    const searchResultsList = this.props.searchResults.map((book) => {
      if (book.avatar === undefined) {
        return (
          <div className="bookCard-wrapper" key={book.isbn}>
            <BookCard
              book={book}
              lists={this.props.lists}
              onSaveToList={this.props.onSaveToList}
              onClickShareBook={this.props.onClickShareBook}
            />
          </div>
        );
      } else {
        return (
          <div key={book.username}>
            <FollowerCard
              user={book}
              onClickRemoveFollower={this.props.onClickRemoveFollower}
            />
          </div>
        );
      }
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
