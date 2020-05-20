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
      //   console.log("Response:", res.data);
      this.setState({
        users: res.data.users,
      });
    });
  }

  followUser = (userId) => {
    console.log("UserId", userId);
    axios.post(`/follow/${userId}`).then((res) => {
      //   console.log("Response:", res.data);
      this.props.setUser(res.data);
      this.setState({
        loggedIn: res.data,
      });
    });
  };

  render() {
    console.log(this.state.loggedIn, this.props.user);
    const filterUsers = this.state.users.filter((el) => {
      return !this.state.loggedIn.following.includes(el._id);
    });
    // console.log("Filtered Users : ", filterUsers);
    const usersList = filterUsers.map((user) => {
      //   console.log("User list:", user);
      return (
        <div key={user._id}>
          {user.username.charAt(0).toUpperCase() +
            user.username.slice(1).toLowerCase()}
          <div className="add-follower-div-img">
            <img
              src="/images/plus-icon.png"
              alt="plus-icon"
              className="add-follower-img"
              onClick={() => this.followUser(user._id)}
            />
          </div>
        </div>
      );
    });

    // console.log(this.props);
    return <div>{usersList}</div>;
  }
}

export default Users;