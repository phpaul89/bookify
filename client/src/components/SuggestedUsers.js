import React, { Component } from "react";
import Users from "./Users";
import "../components/SuggestedUsers.css";

class SuggestedUsers extends Component {
  state = {
    query: "",
  };

  setQuery = (query) => {
    this.setState({
      query: query,
    });
  };

  handleChange = (event) => {
    this.setQuery(event.target.value);
  };

  render() {
    return (
      <div className="follower-section">
        <div className="follower-section-header">Follow</div>
        <div className="follower-section-input">
          <input
            type="text"
            name="follow"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </div>
        <Users
          user={this.props.user}
          setUser={this.props.setUser}
          query={this.state.query}
          triggerSetQuery={this.setQuery}
        />
      </div>
    );
  }
}

export default SuggestedUsers;
