import React, { Component } from "react";
import { login } from "../services/auth";

class Login extends Component {
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
    console.log("aaaaa");
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        this.props.setUser(data);
        //this.props.history.push("/profile");
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              valeu={this.state.password}
              onChange={this.handleChange}
              id="password"
            />
          </div>
          {this.state.message && <div>{this.state.message}</div>}
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
