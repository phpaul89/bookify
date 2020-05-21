import React, { Component } from "react";
import "../components/UserInfo.css";

class UserInfo extends Component {
  onClickFollowing = (event) => {
    console.log("looking for followers");
    const checkEmpty = event.target.innerHTML.toString();

    if (checkEmpty !== "0") {
      this.props.onClickFollowing();
    } else {
      console.log("you didn't follow anyone yet");
    }
  };

  render() {
    const user = this.props.user;

    return (
      <div className="user-info">
        <div className="user-avatar">
          <img src={user.avatar} className="left-section-img" alt="" />
        </div>
        <div className="user-following">
          Following:{" "}
          <p onClick={this.onClickFollowing}>
            {user.following.length !== 0 ? user.following.length : 0}
          </p>
        </div>
        <div className="user-joined">
          Joined: {new Date(user.createdAt).toDateString().slice(10)}
        </div>
      </div>
    );
  }
}

export default UserInfo;
