import React, { Component } from "react";
import UserList from "../components/UserList.js";

class LeftSidebar extends Component {
  render() {
    return (
      <div className="left-sidebar">
        <div className="left-section">User data</div>
        <div className="left-section">
          <UserList lists={this.props.lists} />
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
