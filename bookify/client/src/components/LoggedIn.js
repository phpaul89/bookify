import React, { Component } from "react";
import Dashboard from "../components/Dashboard.js";

class LoggedIn extends Component {
  render() {
    return (
      <div className="app">
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

export default LoggedIn;
