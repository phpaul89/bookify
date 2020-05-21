import React, { Component } from "react";
import axios from "axios";
import "./Users.css";

class Users extends Component {
  state = {
    users: [],
    loggedIn: this.props.user,
  };

  componentDidMount() {
    axios.get("/users").then((res) => {
      this.setState({
        users: res.data.users,
      });
    });
  }

  followUser = (userId) => {
    axios.post(`/follow/${userId}`).then((res) => {
      this.props.setUser(res.data);
      this.setState({
        loggedIn: res.data,
      });
    });
  };

  render() {
    const filterUsers = this.state.users
      .filter((user) => {
        return (
          !this.state.loggedIn.following.includes(user._id) &&
          user.username.toLowerCase().includes(this.props.query.toLowerCase())
        );
      })
      .slice(0, 5);

    const usersList = filterUsers.map((user) => {
      return (
        <div key={user._id} className="follower-group">
          <div className="add-follower-div-img">
            <img
              src="/images/plus-icon.png"
              alt="plus-icon"
              className="add-follower-img"
              onClick={() => this.followUser(user._id)}
            />
          </div>
          {user.username.charAt(0).toUpperCase() +
            user.username.slice(1).toLowerCase()}
        </div>
      );
    });

    return <div>{usersList}</div>;
  }
}

export default Users;
