import React, { Component } from "react";
import UserList from "../components/UserList.js";
import "../components/LeftSidebar.css";
import UserInfo from "../components/UserInfo.js";

class LeftSidebar extends Component {
  render() {
    return (
      <div className="left-sidebar">
        <div className="left-section-user-panel">
          <UserInfo
            user={this.props.user}
            onClickFollowing={this.props.onClickFollowing}
          />
        </div>
        <div className="left-section-list">
          <div className="left-section-list-header">Your lists</div>
          <UserList
            lists={this.props.lists}
            onClickListItem={this.props.onClickListItem}
            onDeleteBookFromList={this.props.onDeleteBookFromList}
            onAddList={this.props.onAddList}
            onDeleteList={this.props.onDeleteList}
          />
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
