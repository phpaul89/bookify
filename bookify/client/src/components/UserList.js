import React, { Component } from "react";
import "../components/UserList.css";

class UserList extends Component {
  render() {
    const listsOfUser = this.props.lists.map((list) => {
      return (
        <div className="list-group">
          <div key="" className="list">
            <p>{list.name}</p>
            <ul>
              {list.books.map((book) => {
                return <li key={book.title}>{book.title}</li>;
              })}
            </ul>
          </div>
          <div className="breakLine">
            <hr />
          </div>
        </div>
      );
    });

    return <div className="list-container">{listsOfUser}</div>;
  }
}

export default UserList;
