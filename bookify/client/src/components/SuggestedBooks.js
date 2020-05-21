import React, { Component } from "react";
import "../components/SuggestedBooks.css";

class SuggestedBooks extends Component {
  state = {
    index: 0,
  };

  componentDidMount = () => {
    console.log("Mounted suggestions");
  };

  acceptSuggestion = (event) => {
    console.log("accept suggested book");

    this.props.acceptSuggestion(
      event.target.getAttribute("title"),
      event.target.getAttribute("suggestedby"),
      event.target.getAttribute("comment")
    );
  };

  rejectSuggestion = (event) => {
    console.log("Title: ", event.target.getAttribute("title"));
    console.log("By: ", event.target.getAttribute("suggestedby"));
    console.log("Comment: ", event.target.getAttribute("comment"));

    this.props.rejectSuggestion(
      event.target.getAttribute("title"),
      event.target.getAttribute("suggestedby"),
      event.target.getAttribute("comment")
    );

    this.setState({ index: 0 });
  };

  slideBack = () => {
    if (this.state.index === 0) {
      console.log("this is the first item");
    } else {
      this.setState({ index: this.state.index - 1 });
    }
  };

  slideForward = () => {
    if (this.state.index === this.props.suggestedList.length - 1) {
      console.log("this is the last item");
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  };

  render() {
    const suggestedList = this.props.suggestedList.map((suggestedBook) => {
      return (
        <div className="bookInSuggestedList">
          <div className="suggestedImage">
            <img src={suggestedBook.cover.medium} alt="" />
            <img
              src="/images/arrow-left.png"
              className="previous"
              onClick={this.slideBack}
              alt=""
            />
            <img
              src="/images/arrow-right.png"
              className="next"
              onClick={this.slideForward}
              alt=""
            />
          </div>
          <div className="suggestedInfo">
            <div className="suggestedBy">
              {suggestedBook.suggestedBy} comments:
            </div>
            <div className="suggestedComment">"{suggestedBook.comment}"</div>
          </div>
          <div className="suggestedAction">
            <img
              src="/images/checked.png"
              alt=""
              className="suggestedAccept"
              title={suggestedBook.title}
              suggestedby={suggestedBook.suggestedBy}
              comment={suggestedBook.comment}
              onClick={this.acceptSuggestion}
            />
            <img
              src="/images/cancel.png"
              alt=""
              className="suggestedDecline"
              title={suggestedBook.title}
              suggestedby={suggestedBook.suggestedBy}
              comment={suggestedBook.comment}
              onClick={this.rejectSuggestion}
            />
          </div>
        </div>
      );
    });
    return (
      <div className="suggestionWrapper">
        {this.props.suggestedList.length === 0 ? (
          <div className="suggestedListWrapper">
            <div className="suggestedNoBooks">Some ideas will arrive soon!</div>
          </div>
        ) : (
          <div className="suggestedListWrapper">
            <div className="suggestedHeader">
              <div className="suggestedCounter">
                {this.props.suggestedList.length}
              </div>
              <div className="suggestedHeaderText">new suggestions</div>
            </div>
            {suggestedList[this.state.index]}
          </div>
        )}
      </div>
    );
  }
}

export default SuggestedBooks;
