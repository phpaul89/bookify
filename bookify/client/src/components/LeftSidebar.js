import React, { Component } from "react";
import UserList from "../components/UserList.js";
import "../components/LeftSidebar.css";

class LeftSidebar extends Component {
  render() {
    return (
      <div className="left-sidebar">
        <div className="left-section-user-panel">User data</div>
        <div className="left-section-list">
          <UserList
            lists={this.props.lists}
            onClickListItem={this.props.onClickListItem}
            onDeleteBookFromList={this.props.onDeleteBookFromList}
          />
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
