import React, { Component } from "react";
import { signup } from "../services/auth";
import "./Signup.css";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    signup(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        // user gets logged in
        this.props.setUser(data);
        //this.props.history.push("/profile");
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="signup-main-section">
        <div className="text-signup">
          <p>Create an account and start sharing books</p>
        </div>
        <div className="signup-section">
          <h2 className="title">Signup</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="username" />
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" />
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
                placeholder="Password"
              />
            </div>
            {this.state.message && <div>{this.state.message}</div>}
            <br />
            <button type="submit" className="signup-btn">
              Signup
            </button>
          </form>
        </div>
        <p className="text-color">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    );
  }
}

export default Signup;
