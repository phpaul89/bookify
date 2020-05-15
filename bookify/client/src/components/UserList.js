import React, { Component } from "react";
import axios from "axios";

class UserList extends Component {
  state = {
    lists: [],
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

  componentDidMount = () => {
    console.log("Mounting UserList component");
    this.getListsFromDb();
  };

  render() {
    const listsOfUser = this.state.lists.map((list) => {
      return (
        <div key="" className="list">
          <p>{list.name}</p>
        </div>
      );
    });

    return <div className="listgroup">{listsOfUser}</div>;
  }
}

export default UserList;
