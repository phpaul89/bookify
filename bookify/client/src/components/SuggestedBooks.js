import React, { Component } from "react";
import "../components/SuggestedBooks.css";

class SuggestedBooks extends Component {
  state = {
    index: 0,
  };

  componentDidMount = () => {
    console.log("Mounted suggestions");
  };

  testMe = () => {
    console.log("test");
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
        <div className="suggestedImage">
          <img src={suggestedBook.cover.medium} alt="" />
        </div>
      );
    });
    return (
      <div className="suggestedListWrapper">
        <div className="bookInSuggestedList">
          <div className="suggestedHeader">
            <div className="suggestedCounter">
              {this.props.suggestedList.length}
            </div>
            <div className="suggestedHeaderText">new suggestions</div>
          </div>
          {suggestedList[this.state.index]}
          <div className="suggestedSlider">
            <div className="slideLeft" onClick={this.slideBack}>
              Previous
            </div>
            <div className="slideRight" onClick={this.slideForward}>
              Next
            </div>
          </div>
          <div className="suggestedAction">
            <div className="suggestedAccept" onClick={this.testMe}>
              Accept
            </div>
            <div className="suggestedDecline">Decline</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestedBooks;
