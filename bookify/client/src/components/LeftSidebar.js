import React, { Component } from "react";
import UserList from "../components/UserList.js";
import "../components/LeftSidebar.css";

class LeftSidebar extends Component {
  render() {
    const user = this.props.user;

    return (
      <div className="left-sidebar">
        <div className="left-section-user-panel">
          {/* {console.log(
            "Users left side:",
            new Date(user.createdAt).toDateString().slice(4)
          )} */}
          <img src="/images/summer.png" className="left-section-img" alt="" />
          {user.username}
          <br />
          Following: {user.following.length}
          <br />
          Member of Bookfy since{" "}
          {new Date(user.createdAt).toDateString().slice(4)}
        </div>
        <div className="left-section-list">
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
