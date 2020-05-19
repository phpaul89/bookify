import React, { Component } from "react";
import "../components/RightSidebar.css";
import SuggestedBooks from "../components/SuggestedBooks.js";

class RightSidebar extends Component {
  render() {
    return (
      <div className="right-sidebar">
        <div className="right-section">
          <SuggestedBooks
            suggestedList={this.props.suggestedList}
            rejectSuggestion={this.props.rejectSuggestion}
            acceptSuggestion={this.props.acceptSuggestion}
          />
        </div>
        <div className="right-section">Newest books</div>
        <div className="right-section">...</div>
      </div>
    );
  }
}

export default RightSidebar;
