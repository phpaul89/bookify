import React, { Component } from "react";
import "../components/RightSidebar.css";

class RightSidebar extends Component {
  render() {
    return (
      <div className="right-sidebar">
        <div className="right-section">Recent reviews</div>
        <div className="right-section">Newest books</div>
        <div className="right-section">...</div>
      </div>
    );
  }
}

export default RightSidebar;
