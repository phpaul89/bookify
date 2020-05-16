import React, { Component } from "react";
import "../components/SuggestedBooks.css";

class SuggestedBooks extends Component {
  render() {
    const suggestedList = this.props.suggestedList.map((suggestedBook) => {
      return (
        <div key="" className="bookInSuggestedList">
          <p>Title: {suggestedBook.title}</p>
          <p>From: {suggestedBook.suggestedBy}</p>
          <p>Comment: {suggestedBook.comment}</p>
        </div>
      );
    });
    return <div>{suggestedList}</div>;
  }
}

export default SuggestedBooks;
