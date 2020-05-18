import React, { Component } from "react";

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
          <img
            src={book.cover.medium} // error when no cover available
            alt=""
          />
          <p>Title: {book.title}</p>
          <p>Authored: {book.by}</p>
          <p>Published: {book.year}</p>
          <p>ISBN: {book.isbn}</p>
          <a href={book.url}>Details</a>
          <br />
          <br />
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
      );
    });

    const userLists = this.props.lists.map((list) => {
      return (
        <p key={list.name} onClick={this.onClickSave}>
          {list.name}
        </p>
      );
    });

    return (
      <div className="allBooksFromSearchResults">
        {searchResultsList}
        {this.state.activeAdd === true ? (
          <div className="chooseListToAddTo">{userLists}</div>
        ) : null}
      </div>
    );
  }
}

export default SearchResults;
