import React, { Component } from "react";
import "../components/UserInfo.css";

class UserInfo extends Component {
  render() {
    const user = this.props.user;

    return (
      <div className="user-info">
        <div className="user-avatar">
          <img src={user.avatar} className="left-section-img" alt="" />
        </div>
        <div className="user-following">Following: {user.following.length}</div>
        <div className="user-joined">
          Joined: {new Date(user.createdAt).toDateString().slice(10)}
        </div>
      </div>
    );
  }
}

export default UserInfo;
