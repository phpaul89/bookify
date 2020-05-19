import React, { Component } from "react";
import "../components/BookCard.css";

class BookCard extends Component {
  state = {
    activeAdd: false,
    activeShare: false,
    comment: "",
    friend: "",
  };

  onClickAdd = () => {
    this.setState({
      activeAdd: !this.state.activeAdd,
      activeShare: false,
    });
  };

  onClickSave = (event) => {
    console.log(event.target.innerHTML, this.props.book.title);
    this.props.onSaveToList(event.target.innerHTML, this.props.book.title);
  };

  onClickShare = (event) => {
    this.setState({
      activeShare: !this.state.activeShare,
      activeAdd: false,
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
    console.log(this.state.comment, this.state.friend, this.props.book.title);
    this.props.onClickShareBook(
      this.state.comment,
      this.state.friend,
      this.props.book.title
    );
    document.getElementById("commentInput").value = "";
    document.getElementById("friendInput").value = "";
    this.setState({ comment: "", friend: "" });
  };

  render() {
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

    return (
      <div className="allBooksFromSearchResultsTwo">
        <div key="" className="bookInSearchResultsList">
          <div className="imageBookSearchResult">
            <img
              src={this.props.book.cover.medium} // error when no cover available
              alt=""
            />
          </div>
          <div className="contentBookSearchResult">
            <div className="infoBookSearchResult">
              <p>Title: {this.props.book.title}</p>
              <p>Author: {this.props.book.by}</p>
              <p>Published: {this.props.book.year}</p>
              <p>ISBN: {this.props.book.isbn}</p>
              <a href={this.props.book.url}>Details</a>
            </div>
            <div className="buttonsBookSearchResult">
              <input
                className="addButton"
                type="button"
                onClick={this.onClickAdd}
                value="Add to List"
                name={this.props.book.title}
              />
              <input
                className="shareButton"
                type="button"
                onClick={this.onClickShare}
                value="Share"
                name={this.props.book.title}
              />
            </div>
          </div>
        </div>

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

export default BookCard;
