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
        console.log(listDataOfUser);
        this.setState({ lists: listDataOfUser });
      })
      .catch((error) => {
        console.log("Error getting lists from database: ", error);
      });
  };

  onAddList = (newList) => {
    //console.log("new list name: ", newList);

    axios
      .post("/addList", { name: newList })
      .then((response) => {
        // response == "done" from backend
        //console.log("frontend: list added");
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error adding list: ", error);
      });
  };

  getSuggestedBooksFromDb = () => {
    console.log("getting suggested books now");
    axios
      .get("/getSuggestedBooksList")
      .then((response) => {
        let listDataOfSuggestedBooks = response.data;
        //console.log("here now", listDataOfSuggestedBooks);
        this.setState({ suggestedList: listDataOfSuggestedBooks });
      })
      .catch((error) => {
        console.log("Error getting suggested books: ", error);
      });
  };

  acceptSuggestion = (title, suggestedBy, comment) => {
    console.log("accept: ", title, suggestedBy, comment);

    axios
      .post("/acceptSuggestion", {
        title: title,
        suggestedBy: suggestedBy,
        comment: comment,
      })
      .then((response) => {
        console.log("frontend: added new fav: ", response);
        this.getListsFromDb();
        this.getSuggestedBooksFromDb();
      })
      .catch((error) => {
        console.log("frontend: error adding fav: ", error);
      });
  };

  rejectSuggestion = (title, suggestedBy, comment) => {
    console.log("rejecting suggestion now");
    console.log("Title: ", title);
    console.log("By: ", suggestedBy);
    console.log("Comment: ", comment);

    axios
      .post("/rejectSuggestion", {
        title: title,
        suggestedBy: suggestedBy,
        comment: comment,
      })
      .then((response) => {
        console.log("frontend: suggestion rejected successfully", response);
        this.getSuggestedBooksFromDb();
      })
      .catch((error) => {
        console.log("Error at rejecting suggestion: ", error);
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

  onSaveToList = (listName, bookTitle) => {
    //console.log("from LoggedIn component");
    console.log("frontend: book title: ", bookTitle);
    console.log("frontend: list name: ", listName);

    console.log(this.state.searchResults);

    const bookToList = this.state.searchResults.find((book) => {
      return book.title === bookTitle;
    });

    console.log("frontend: book to save: ", bookToList);

    // maybe remove from state after saving to list with '.then'
    axios
      .post("/dashboard/saveToList", { book: bookToList, list: listName })
      .then((flag) => {
        //console.log("updating list: ", flag);
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error at onSaveToList: ", error);
      });
  };

  onClickListItem = (bookTitle, listName) => {
    console.log(listName);
    //console.log("In LoggedIn component, book title: ", bookTitle);
    // .post needed somehow, .get doesn't work for passing variable

    if (listName !== "Special") {
      axios
        .post("/getBook", { title: bookTitle })
        .then((response) => {
          //console.log(response);
          const bookFromDb = response.data;
          console.log("got this book from database: ", bookFromDb);
          this.setState({
            //searchResults: [...this.state.searchResults, ...bookFromDb], **works
            searchResults: bookFromDb,
          });
        })
        .catch((error) => {
          console.log("Error at onClickListItem: ", error);
        });
    } else {
      axios
        .post("/getSpecialBook", { title: bookTitle })
        .then((response) => {
          //console.log(response);
          const bookFromDb = response.data;
          console.log("got this book from database: ", bookFromDb);
          this.setState({
            //searchResults: [...this.state.searchResults, ...bookFromDb], **works
            searchResults: bookFromDb,
          });
        })
        .catch((error) => {
          console.log("Error at onClickListItem: ", error);
        });
    }
  };

  onShareBook = (comment, friend, bookTitle) => {
    //console.log("book to share: ", bookTitle);
    axios
      .post("/shareBook", {
        title: bookTitle,
        friend: friend,
        comment: comment,
      })
      .then((response) => {
        console.log("response from backend: ", response.data);
        if (response.data === "Success") {
          console.log("Book shared successfully!");
        } else if (response.data === "Failure") {
          console.log("User not found");
        } else {
          console.log("Unexpected error sharing book");
        }
      })
      .catch((error) => {
        console.log("Error at sharing book: ", error);
      });
  };

  onDeleteBookFromList = (bookTitle, listName) => {
    axios
      .post("/deleteBookFromList", { book: bookTitle, list: listName })
      .then((response) => {
        console.log("frontend: removed book from list");
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error at deleting book: ", error);
      });
  };

  onDeleteList = (delList) => {
    axios
      .post("/deleteList", { name: delList })
      .then((response) => {
        // response == "done" from backend
        //console.log("frontend: list added");
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error adding list: ", error);
      });
  };

  render() {
    return (
      <div className="app">
        <div className="main-wrapper">
          <LeftSidebar
            lists={this.state.lists}
            onClickListItem={this.onClickListItem}
            onDeleteBookFromList={this.onDeleteBookFromList}
            onAddList={this.onAddList}
            user={this.props.user}
            setUser={this.props.setUser}
            onDeleteList={this.onDeleteList}
          />

          <Dashboard
            searchResults={this.state.searchResults}
            updateSearchResults={this.updateSearchResults}
            onSaveToList={this.onSaveToList}
            onClickShareBook={this.onShareBook}
            lists={this.state.lists}
          />

          <RightSidebar
            user={this.props.user}
            setUser={this.props.setUser}
            suggestedList={this.state.suggestedList}
            rejectSuggestion={this.rejectSuggestion}
            acceptSuggestion={this.acceptSuggestion}
          />
        </div>
      </div>
    );
  }
}

export default LoggedIn;
