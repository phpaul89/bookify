import React, { Component } from "react";
import Users from "./Users";

class SuggestedUsers extends Component {
  render() {
    return (
      <div>
        <Users user={this.props.user} setUser={this.props.setUser} />
      </div>
    );
  }
}

export default SuggestedUsers;
