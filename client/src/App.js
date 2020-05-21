import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LoggedIn from "./components/LoggedIn.js";

class App extends Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    console.log("appjs User: ", user);
    this.setState({
      user: user,
    });
  };
  render() {
    return (
      <div className="app">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />
        {/* <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        /> */}

        <Route
          exact
          path="/"
          render={(props) => {
            return this.state.user ? (
              <LoggedIn user={this.state.user} setUser={this.setUser} />
            ) : (
              <Route
                exact
                path="/"
                render={(props) => <Login setUser={this.setUser} {...props} />}
              />
            );
          }}
        />
        <footer>
          <div>
            2020 Ironhack WebDev Final Project | Brought to life by the awesome
            Marcia Furtado and Phillip Paul
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
