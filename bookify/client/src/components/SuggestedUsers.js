import React, { Component } from "react";
import Users from "./Users";

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
    // console.log("Suggested Users", this.props.user);
    return (
      <div>
        Follow
        <div>
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
