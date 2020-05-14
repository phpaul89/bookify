import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import BookList from "./components/BookList.js"; // <BookList />
import Dashboard from "./components/Dashboard.js";

// class App extends Component {
//   state = {
//     user: this.props.user,
//   };

//   setUser = (user) => {
//     this.setState({
//       user: user,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Navbar user={this.state.user} setUser={this.setUser} />
//         <Route
//           exact
//           path="/signup"
//           render={(props) => <Signup setUser={this.setUser} {...props} />}
//         />
//         <Route
//           exact
//           path="/login"
//           render={(props) => <Login setUser={this.setUser} {...props} />}
//         />
//         <BookList />
//       </div>
//     );
//   }
// }

// TESTING Dashboard:
class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="navbar-dummy">Navbar</div>
        <div className="main-wrapper">
          <div className="left-sidebar">
            <div className="left-section">User data</div>
            <div className="left-section">List data</div>
          </div>
          <Dashboard />
          <div className="right-sidebar">
            <div className="right-section">Recent reviews</div>
            <div className="right-section">Newest books</div>
            <div className="right-section">...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
