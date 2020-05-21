import React, { Component } from "react";
import "../components/RightSidebar.css";
import SuggestedBooks from "../components/SuggestedBooks.js";
import SuggestedUsers from "../components/SuggestedUsers";
import RandomBooks from "./RandomBooks";

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
        <div className="random-section">
          <RandomBooks
            randomList={this.props.randomList}
            refreshRandomList={this.props.refreshRandomList}
            updateSearchResults={this.props.updateSearchResults}
          />
        </div>
        <div className="follow-title">
          <SuggestedUsers user={this.props.user} setUser={this.props.setUser} />
        </div>
      </div>
    );
  }
}

export default RightSidebar;
