import React, { Component } from "react";
import LeftSidebar from "../components/LeftSidebar.js";
import Dashboard from "../components/Dashboard.js";
import RightSidebar from "../components/RightSidebar.js";

class LoggedIn extends Component {
  render() {
    return (
      <div className="app">
        <div className="main-wrapper">
          <LeftSidebar />
          <Dashboard />
          <RightSidebar />
        </div>
      </div>
    );
  }
}

export default LoggedIn;
