import React, { Component } from "react";
import "../components/Dashboard.css";
import SearchBar from "../components/SearchBar.js";
import SearchResults from "../components/SearchResults.js";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-search">
          <SearchBar updateSearchResults={this.props.updateSearchResults} />
        </div>
        <div className="dashboard-result">
          <SearchResults
            searchResults={this.props.searchResults}
            onSaveToList={this.props.onSaveToList}
            onClickShareBook={this.props.onClickShareBook}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
