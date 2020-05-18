import React, { Component } from "react";
import "../components/SearchResults.css";

class SearchResults extends Component {
  state = {
    activeAdd: false,
    bookToAdd: "",
  };
  onClickAdd = (event) => {
    this.setState({
      activeAdd: !this.state.activeAdd,
      bookToAdd: event.target.name,
    });
  };

  onClickSave = (event) => {
    console.log(event.target.innerHTML, this.state.bookToAdd);
    this.props.onSaveToList(event.target.innerHTML, this.state.bookToAdd);
  };

  onClickShare = (event) => {
    this.props.onClickShareBook(event.target.name);
  };

  render() {
    const searchResultsList = this.props.searchResults.map((book) => {
      return (
        <div key="" className="bookInSearchResultsList">
          <div className="imageBookSearchResult">
            <img
              src={book.cover.medium} // error when no cover available
              alt=""
            />
          </div>
          <div className="contentBookSearchResult">
            <div className="infoBookSearchResult">
              <p>Title: {book.title}</p>
              <p>Author: {book.by}</p>
              <p>Published: {book.year}</p>
              <p>ISBN: {book.isbn}</p>
              <a href={book.url}>Details</a>
            </div>
            <div className="buttonsBookSearchResult">
              <input
                type="button"
                onClick={this.onClickAdd}
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
          </div>
        </div>
      );
    });

    const userLists = this.props.lists.map((list) => {
      return (
        <p key={list.name} onClick={this.onClickSave}>
          {list.name}
        </p>
      );
    });

    return searchResultsList.length === 0 ? (
      <div className="allBooksFromSearchResultsOne">
        <p>Grab a book</p>
        <img src="/images/pulse.gif" alt="pulse-ani" />
      </div>
    ) : (
      <div className="allBooksFromSearchResultsTwo">
        {searchResultsList}
        {this.state.activeAdd === true ? (
          <div className="chooseListToAddTo">{userLists}</div>
        ) : null}
      </div>
    );
  }
}

export default SearchResults;
