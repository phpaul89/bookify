import React, { Component } from "react";
import LeftSidebar from "../components/LeftSidebar.js";
import Dashboard from "../components/Dashboard.js";
import RightSidebar from "../components/RightSidebar.js";
import axios from "axios";

class LoggedIn extends Component {
  state = {
    searchResults: [],
    lists: [],
  };

  componentDidMount = () => {
    console.log("Mounting and getting lists from database");
    this.getListsFromDb();
  };

  getListsFromDb = () => {
    axios
      .get("/dashboard/getUserList")
      .then((listsOfUser) => {
        console.log("Success getting lists from database: ", listsOfUser);
        let listDataOfUser = listsOfUser.data;
        console.log(listDataOfUser);
        this.setState({ lists: listDataOfUser });
      })
      .catch((error) => {
        console.log("Error getting lists from database: ", error);
      });
  };

  updateSearchResults = (bookJSON, isbn) => {
    this.setState({
      // correct way to push into state property array: instead of '.push' using spread operator
      searchResults: [
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

  onSaveToList = (bookTitle) => {
    console.log("from dashboard");
    console.log(bookTitle);

    const bookToList = this.state.searchResults.find((book) => {
      return book.title === bookTitle;
    });

    console.log(bookToList);

    // maybe remove from state after saving to list with '.then'
    axios
      .post("/dashboard/saveToList", { book: bookToList, list: "Default" })
      .then((updateList) => {
        console.log("updating list: ", updateList);
        this.getListsFromDb();
      });
  };

  render() {
    return (
      <div className="app">
        <div className="main-wrapper">
          <LeftSidebar lists={this.state.lists} />
          <Dashboard
            searchResults={this.state.searchResults}
            updateSearchResults={this.updateSearchResults}
            onSaveToList={this.onSaveToList}
          />
          <RightSidebar />
        </div>
      </div>
    );
  }
}

export default LoggedIn;
