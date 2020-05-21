import React, { Component } from "react";
import LeftSidebar from "../components/LeftSidebar.js";
import Dashboard from "../components/Dashboard.js";
import RightSidebar from "../components/RightSidebar.js";
import axios from "axios";
import "../components/LoggedIn.css";
import randomJSON from "../components/demo/random.json";

class LoggedIn extends Component {
  state = {
    searchResults: [],
    lists: [],
    suggestedList: [],
    randomList: [],
  };

  componentDidMount = () => {
    console.log("Mounting and getting lists from database");
    this.booksFromFollowersList();
    this.getListsFromDb();
    this.getSuggestedBooksFromDb();
    this.getRandomList();
  };

  refreshRandomList = (bookTitle) => {
    this.setState({
      randomList: [...this.state.randomList].filter(
        (book) => book.title !== bookTitle
      ),
    });
  };

  getRandomList = () => {
    console.log("get RandomBooks: ", randomJSON.docs);
    this.setState({ randomList: randomJSON.docs });

    // axios
    //   .get("http://openlibrary.org/search.json?author=michael+lewis")
    //   .then((getRandomBooks) => {
    //     let length = getRandomBooks.data.docs.length;
    //     let min = Math.floor(Math.random() * (length - 3));
    //     let max = min + 3;

    //     console.log(min);
    //     console.log(max);

    //     const onlyThreeISBN = getRandomBooks.data.docs
    //       .slice(min, max)
    //       .map((book) =>
    //         book.isbn.find((number) => number.toString().length === 13)
    //       );

    //     for (let isbn of onlyThreeISBN) {
    //       console.log(isbn);
    //       axios
    //         .get(
    //           `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
    //         )
    //         .then((bookJSON) => {
    //           console.log(bookJSON.data);
    //           this.setState({
    //             randomList: [
    //               ...this.state.randomList,
    //               {
    //                 isbn: isbn,
    //                 title: bookJSON.data[`ISBN:${isbn}`].title,
    //               },
    //             ],
    //           });
    //         })
    //         .catch((error) => {
    //           console.log("Error calling axios at isbn search: ", error);
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error axios call: ", error);
    //   });
  };

  booksFromFollowersList = () => {
    axios.get("/followers/getbooks").then((listOfBooks) => {
      // console.log("Front end books list", listOfBooks.data.booksFromFollowers);
      // this.state.searchResults.push(listOfBooks.data.booksFromFollowers);
      this.setState({
        searchResults: listOfBooks.data.booksFromFollowers,
      });
    });
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
    if (isbn === "reset") {
      this.setState({ searchResults: [] });
    } else {
      //console.log(bookJSON.data[`ISBN:${isbn}`].cover.medium);
      console.log(bookJSON.data[`ISBN:${isbn}`]["by_statement"]);
      let coverCheck = { medium: "" };

      if (bookJSON.data[`ISBN:${isbn}`].cover !== undefined) {
        coverCheck = bookJSON.data[`ISBN:${isbn}`].cover;
      } else {
        coverCheck = {
          medium: "/images/no-img.png",
        };
      }

      console.log(coverCheck);

      this.setState({
        // correct way to push into state property array: instead of '.push' using spread operator
        searchResults: [
          ...this.state.searchResults,
          {
            isbn: isbn,
            title: bookJSON.data[`ISBN:${isbn}`].title,
            cover: coverCheck,
            by: bookJSON.data[`ISBN:${isbn}`]["by_statement"],
            year: bookJSON.data[`ISBN:${isbn}`]["publish_date"],
            url: bookJSON.data[`ISBN:${isbn}`].url,
          },
        ],
      });
    }
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
      <div className="loggedin-main-div">
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
            randomList={this.state.randomList}
            refreshRandomList={this.refreshRandomList}
            updateSearchResults={this.updateSearchResults}
          />
        </div>
      </div>
    );
  }
}

export default LoggedIn;
