import React, { Component } from "react";
import "../components/Dashboard.css";
import SearchBar from "../components/SearchBar.js";
import SearchResults from "../components/SearchResults.js";

class Dashboard extends Component {
  state = {
    searchResults: [],
  };

  updateSearchResults = (bookJSON, isbn) => {
    this.setState({
      // correct way to push into state property array: instead of '.push' using spread operator
      searchResults: [
        ...this.state.searchResults,
        {
          title: bookJSON.data[`ISBN:${isbn}`].title,
          cover: bookJSON.data[`ISBN:${isbn}`].cover,
          by_statement: bookJSON.data[`ISBN:${isbn}`]["by_statement"],
          publish_date: bookJSON.data[`ISBN:${isbn}`]["publish_date"],
          url: bookJSON.data[`ISBN:${isbn}`].url,
        },
      ],
    });
  };

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-search">
          <SearchBar searchResults={this.updateSearchResults} />
        </div>
        <div className="dashboard-result">
          <SearchResults searchResults={this.state.searchResults} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
