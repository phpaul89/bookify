import React, { Component } from "react";
import "../components/SearchResults.css";

class SearchResults extends Component {
  state = {
    activeAdd: false,
    activeShare: false,
    bookToAdd: "",
    comment: "",
    friend: "",
  };
  onClickAdd = (event) => {
    this.setState({
      activeAdd: !this.state.activeAdd,
      activeShare: false,
      bookToAdd: event.target.name,
    });
  };

  onClickSave = (event) => {
    console.log(event.target.innerHTML, this.state.bookToAdd);
    this.props.onSaveToList(event.target.innerHTML, this.state.bookToAdd);
  };

  onClickShare = (event) => {
    this.setState({
      activeShare: !this.state.activeShare,
      activeAdd: false,
      bookToAdd: event.target.name,
    });
  };

  onCommentInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ comment: event.target.value });
  };

  onFriendInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ friend: event.target.value });
  };

  onClickSend = () => {
    console.log(this.state.comment, this.state.friend, this.state.bookToAdd);
    this.props.onClickShareBook(
      this.state.comment,
      this.state.friend,
      this.state.bookToAdd
    );
    document.getElementById("commentInput").value = "";
    document.getElementById("friendInput").value = "";
    this.setState({ comment: "", friend: "" });
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
                className="addButton"
                type="button"
                onClick={this.onClickAdd}
                value="Add to List"
                name={book.title}
              />
              <input
                className="shareButton"
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
        <button
          type="button"
          className="addToListButton"
          key={list.name}
          onClick={this.onClickSave}
        >
          {list.name}
        </button>
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
        {this.state.activeShare === true ? (
          <div className="chooseShareInfo">
            <form>
              <input
                id="commentInput"
                className="commentInput"
                type="text"
                placeholder="Comment ..."
                onChange={this.onCommentInputChange}
                required
              />
              <input
                id="friendInput"
                className="friendInput"
                type="text"
                placeholder="User ..."
                onChange={this.onFriendInputChange}
                required
              />
              <input
                className="shareSendButton"
                type="button"
                value="Send"
                onClick={this.onClickSend}
              />
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchResults;
