import React, { Component } from "react";
import "../components/FollowerCard.css";

class FollowerCard extends Component {
  onClickRemoveFollower = (event) => {
    this.props.onClickRemoveFollower(event.target.getAttribute("follower"));
  };

  render() {
    return (
      <div className="followerWrapper">
        <div className="followerAvatar">
          <img src={this.props.user.avatar} alt="" />
          <img
            src="/images/delete-icon.png"
            id="removeFollower"
            onClick={this.onClickRemoveFollower}
            follower={this.props.user.username}
            alt="delete-icon"
          />
        </div>
        <div className="followerUsername">{this.props.user.username}</div>
      </div>
    );
  }
}

export default FollowerCard;
