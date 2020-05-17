import React, { Component } from "react";
import LeftSidebar from "../components/LeftSidebar.js";
import Dashboard from "../components/Dashboard.js";
import RightSidebar from "../components/RightSidebar.js";
import axios from "axios";
import "../components/LoggedIn.css";

class LoggedIn extends Component {
  state = {
    searchResults: [],
    lists: [],
    suggestedList: [],
  };

  componentDidMount = () => {
    console.log("Mounting and getting lists from database");
    this.getListsFromDb();
    this.getSuggestedBooksFromDb();
  };

  getListsFromDb = () => {
    axios
      .get("/dashboard/getUserList")
      .then((listsOfUser) => {
        //console.log("Success getting lists from database: ", listsOfUser);
        let listDataOfUser = listsOfUser.data;
        //console.log(listDataOfUser);
        this.setState({ lists: listDataOfUser });
      })
      .catch((error) => {
        console.log("Error getting lists from database: ", error);
      });
  };

  getSuggestedBooksFromDb = () => {
    axios
      .get("/getSuggestedBooksList")
      .then((response) => {
        let listDataOfSuggestedBooks = response.data;
        //console.log(listDataOfSuggestedBooks);
        this.setState({ suggestedList: listDataOfSuggestedBooks });
      })
      .catch((error) => {
        console.log("Error getting suggested books: ", error);
      });
  };

  updateSearchResults = (bookJSON, isbn) => {
    this.setState({
      // correct way to push into state property array: instead of '.push' using spread operator
      searchResults: [
        {
          isbn: isbn,
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
    //console.log("from LoggedIn component");
    //console.log(bookTitle);

    const bookToList = this.state.searchResults.find((book) => {
      return book.title === bookTitle;
    });

    //console.log(bookToList);

    // maybe remove from state after saving to list with '.then'
    axios
      .post("/dashboard/saveToList", { book: bookToList, list: "Default" })
      .then((flag) => {
        //console.log("updating list: ", flag);
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error at onSaveToList: ", error);
      });
  };

  onClickListItem = (bookTitle) => {
    //console.log("In LoggedIn component, book title: ", bookTitle);
    // .post needed somehow, .get doesn't work for passing variable
    axios
      .post("/getBook", { title: bookTitle })
      .then((response) => {
        //console.log(response);
        const bookFromDb = response.data;
        //console.log(bookFromDb);
        this.setState({ searchResults: bookFromDb });
      })
      .catch((error) => {
        console.log("Error at onClickListItem: ", error);
      });
  };

  onShareBook = (bookTitle) => {
    //console.log("book to share: ", bookTitle);
    axios
      .post("/shareBook", {
        title: bookTitle,
        friend: "Phillip",
        comment: "A great book!",
      })
      .then((response) => {
        console.log("sharing successful on frontend: ", response);
        //const suggestedBookFromDb = response.data;
        //this.setState({ suggestedList: suggestedBookFromDb });
      })
      .catch((error) => {
        console.log("Error at sharing book: ", error);
      });
  };

  render() {
    return (
      <div className="app">
        <div className="main-wrapper">
          <LeftSidebar
            lists={this.state.lists}
            onClickListItem={this.onClickListItem}
          />
          <Dashboard
            searchResults={this.state.searchResults}
            updateSearchResults={this.updateSearchResults}
            onSaveToList={this.onSaveToList}
            onClickShareBook={this.onShareBook}
          />
          <RightSidebar suggestedList={this.state.suggestedList} />
        </div>
      </div>
    );
  }
}

export default LoggedIn;
