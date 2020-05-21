import React, { Component } from "react";
import "../components/SearchResults.css";
import BookCard from "../components/BookCard.js";
import FollowerCard from "../components/FollowerCard.js";

class SearchResults extends Component {
  render() {
    const searchResultsList = this.props.searchResults.map((item) => {
      if (item.avatar === undefined) {
        return (
          <div className="bookCard-wrapper" key={item.isbn}>
            <BookCard
              book={item}
              lists={this.props.lists}
              onSaveToList={this.props.onSaveToList}
              onClickShareBook={this.props.onClickShareBook}
              user={this.props.user}
            />
          </div>
        );
      } else {
        return (
          <div key={item.username}>
            <FollowerCard
              user={item}
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
