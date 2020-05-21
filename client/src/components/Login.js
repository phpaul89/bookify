import React, { Component } from "react";
import { login } from "../services/auth";
import "./Login.css";

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
        console.log(this, this.props);
        this.props.setUser(data);
        //this.props.history.push("/profile");
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="login-main-section">
        <div>
          <p>
            Keep track of the books you've read and share it with your friends.
          </p>
        </div>
        <div className="login-section">
          <h2 className="title">Login</h2>
          <div>
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
                  valeu={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  placeholder="Password"
                />
              </div>
              {this.state.message && <div>{this.state.message}</div>}
              <br />
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
        <p className="text-color">
          Don't have an account? <a href="signup">Signup</a>
        </p>
      </div>
    );
  }
}

export default Login;
