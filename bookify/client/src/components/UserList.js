import React, { Component } from "react";
import axios from "axios";

class UserList extends Component {
  render() {
    const listsOfUser = this.props.lists.map((list) => {
      return (
        <div key="" className="list">
          <p>{list.name}</p>
          <ul>
            {list.books.map((book) => {
              return <li key={book}>{book}</li>;
            })}
          </ul>
        </div>
      );
    });

    return <div className="listgroup">{listsOfUser}</div>;
  }
}

export default UserList;
