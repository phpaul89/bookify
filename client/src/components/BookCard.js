import React, { Component } from "react";
import "../components/BookCard.css";
import axios from "axios";

class BookCard extends Component {
  state = {
    activeAdd: false,
    activeShare: false,
    comment: "",
    friend: "",
  };

  onClickAdd = () => {
    if (this.props.lists.length !== 0) {
      this.setState({
        activeAdd: !this.state.activeAdd,
        activeShare: false,
      });
    } else {
      console.log("Create a list first");
    }
  };

  onClickSave = (event) => {
    this.props.onSaveToList(event.target.innerHTML, this.props.book.title);
  };

  onClickShare = () => {
    console.log("book details: ", this.props.book);
    axios
      .post("/saveBookWhenClickShare", { book: this.props.book })
      .then((response) => {
        this.setState({
          activeShare: !this.state.activeShare,
          activeAdd: false,
        });
      })
      .catch((error) => {
        console.log("frontend: error at saveBookWhenClickShare: ", error);
      });
  };

  onCommentInputChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  onFriendInputChange = (event) => {
    this.setState({ friend: event.target.value });
  };

  onClickSend = () => {
    if (this.state.friend !== this.props.user.username) {
      this.props.onClickShareBook(
        this.state.comment,
        this.state.friend,
        this.props.book.title
      );
      document.getElementById("commentInput").value = "";
      document.getElementById("friendInput").value = "";
      this.setState({ comment: "", friend: "" });
    } else {
      console.log("cannot share book with oneself");
    }
  };

  render() {
    const userLists = this.props.lists.map((list) => {
      if (list.name === "Special") {
        return null;
      } else {
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
      }
    });

    return (
      <div className="allBooksFromSearchResultsThree">
        <div className="bookInSearchResultsList">
          <div className="imageBookSearchResult">
            {this.props.book.cover.medium !== undefined ? (
              <img
                src={this.props.book.cover.medium} // error when no cover available
                alt=""
              />
            ) : null}

            {this.props.book.suggestedBy !== undefined ? (
              <div>
                <div className="specialClip">
                  <p className="specialFriend">{this.props.book.suggestedBy}</p>
                </div>
                <div className="specialComment">
                  {this.props.book.comments[0]}
                </div>
              </div>
            ) : null}
          </div>
          <div className="contentBookSearchResult">
            <div className="infoBookSearchResult">
              <p>Title: {this.props.book.title}</p>
              <p>Author: {this.props.book.by}</p>
              <p>Published: {this.props.book.year}</p>
              <p>ISBN: {this.props.book.isbn}</p>

              <a href={this.props.book.url}>Details</a>
            </div>
            {this.props.book.suggestedBy !== undefined ? null : (
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
            )}
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
