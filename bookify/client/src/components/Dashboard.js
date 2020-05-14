import React, { Component } from "react";
import "../components/Dashboard.css";
import SearchBar from "../components/SearchBar.js";
import SearchResults from "../components/SearchResults.js";

class Dashboard extends Component {
  state = {
    searchResults: [],
  };

  updateSearchResults = (bookJSON, isbn) => {
    // comment block
    console.log(bookJSON.data[`ISBN:${isbn}`]);
    console.log(bookJSON.data[`ISBN:${isbn}`].title);
    console.log(bookJSON.data[`ISBN:${isbn}`]["publish_date"]);
    console.log("Current userBooks property: ", this.state.userBooks);
    // end comment block

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
    console.log("New userBooks property: ", this.state.searchResults);
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
