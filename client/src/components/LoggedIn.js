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

  // deprecated lifecycle method:
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.user, this.props.user);
    if (
      JSON.stringify(nextProps.user.following) !==
      JSON.stringify(this.props.user)
    ) {
      this.booksFromFollowersList();
      this.getSuggestedBooksFromDb();
    }
  };

  refreshRandomList = (bookTitle) => {
    this.setState({
      randomList: [...this.state.randomList].filter(
        (book) => book.title !== bookTitle
      ),
    });
  };

  getRandomList = () => {
    this.setState({ randomList: randomJSON.docs });
  };

  booksFromFollowersList = () => {
    axios.get("/followers/getbooks").then((listOfBooks) => {
      this.setState({
        searchResults: listOfBooks.data.booksFromFollowers,
      });
    });
  };

  getListsFromDb = () => {
    axios
      .get("/dashboard/getUserList")
      .then((listsOfUser) => {
        let listDataOfUser = listsOfUser.data;
        this.setState({ lists: listDataOfUser });
      })
      .catch((error) => {
        console.log("Error getting lists from database: ", error);
      });
  };

  onAddList = (newList) => {
    axios
      .post("/addList", { name: newList })
      .then((response) => {
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error adding list: ", error);
      });
  };

  getSuggestedBooksFromDb = () => {
    axios
      .get("/getSuggestedBooksList")
      .then((response) => {
        let listDataOfSuggestedBooks = response.data;
        this.setState({ suggestedList: listDataOfSuggestedBooks });
      })
      .catch((error) => {
        console.log("Error getting suggested books: ", error);
      });
  };

  acceptSuggestion = (title, suggestedBy, comment) => {
    axios
      .post("/acceptSuggestion", {
        title: title,
        suggestedBy: suggestedBy,
        comment: comment,
      })
      .then((response) => {
        this.getListsFromDb();
        this.getSuggestedBooksFromDb();
      })
      .catch((error) => {
        console.log("frontend: error adding fav: ", error);
      });
  };

  rejectSuggestion = (title, suggestedBy, comment) => {
    axios
      .post("/rejectSuggestion", {
        title: title,
        suggestedBy: suggestedBy,
        comment: comment,
      })
      .then((response) => {
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
      console.log("bookJSON from updateSearchResults: ", bookJSON);
      console.log("author: ", bookJSON.data[`ISBN:${isbn}`]["by_statement"]);
      console.log("author: ", bookJSON.data[`ISBN:${isbn}`].by_statement);
      console.log("year: ", bookJSON.data[`ISBN:${isbn}`]["publish_date"]);
      console.log("year: ", bookJSON.data[`ISBN:${isbn}`].publish_date);
      let coverCheck = { medium: "" };

      if (bookJSON.data[`ISBN:${isbn}`].cover !== undefined) {
        coverCheck = bookJSON.data[`ISBN:${isbn}`].cover;
      } else {
        coverCheck = {
          medium: "/images/no-img.png",
        };
      }

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

  onClickFollowing = () => {
    axios
      .post("/getFollowers")
      .then((response) => {
        const followersFromDb = response.data;
        this.setState({
          //searchResults: [...this.state.searchResults, ...bookFromDb], **works
          searchResults: followersFromDb,
        });
      })
      .catch((error) => {
        console.log("Error at onClickFollowing: ", error);
      });
  };

  onSaveToList = (listName, bookTitle) => {
    const bookToList = this.state.searchResults.find((book) => {
      return book.title === bookTitle;
    });

    // maybe remove from state after saving to list with '.then'
    axios
      .post("/dashboard/saveToList", { book: bookToList, list: listName })
      .then((flag) => {
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error at onSaveToList: ", error);
      });
  };

  onClickListItem = (bookTitle, listName) => {
    if (listName !== "Special") {
      axios
        .post("/getBook", { title: bookTitle })
        .then((response) => {
          const bookFromDb = response.data;
          this.setState({
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
          const bookFromDb = response.data;
          this.setState({
            searchResults: bookFromDb,
          });
        })
        .catch((error) => {
          console.log("Error at onClickListItem: ", error);
        });
    }
  };

  onShareBook = (comment, friend, bookTitle) => {
    axios
      .post("/shareBook", {
        title: bookTitle,
        friend: friend,
        comment: comment,
      })
      .then((response) => {
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
        this.getListsFromDb();
      })
      .catch((error) => {
        console.log("Error adding list: ", error);
      });
  };

  onClickRemoveFollower = (followerName) => {
    axios
      .post("/removeFollower", { name: followerName })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((error) => {
        console.log("Error at removing follower: ", error);
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
            onClickFollowing={this.onClickFollowing}
          />

          <Dashboard
            searchResults={this.state.searchResults}
            updateSearchResults={this.updateSearchResults}
            onSaveToList={this.onSaveToList}
            onClickShareBook={this.onShareBook}
            lists={this.state.lists}
            onClickRemoveFollower={this.onClickRemoveFollower}
            user={this.props.user}
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
