import React, { Component } from "react";
import "../components/UserList.css";

class UserList extends Component {
  state = {
    activeLists: [],
  };

  clickListItem = (event) => {
    this.props.onClickListItem(event.target.innerHTML);
  };

  // list should toggle between hiding/showing list books
  // add/remove toggled lists to state 'activeLists' for conditional rendering
  clickList = (event) => {
    // console.log("Clicked on list: ", event.target.innerHTML);
    const checkActive = this.state.activeLists.includes(event.target.innerHTML);

    if (checkActive === true) {
      const newActiveLists = this.state.activeLists.filter(
        (list) => list !== event.target.innerHTML
      );
      this.setState({ activeLists: newActiveLists });
    } else {
      this.setState({
        activeLists: [...this.state.activeLists, event.target.innerHTML],
      });
    }
  };

  render() {
    const listsOfUser = this.props.lists.map((list) => {
      return (
        <div key={list.name} className="list-group">
          <div className="list">
            <p key={list.name} onClick={this.clickList}>
              {list.name}
            </p>
            {this.state.activeLists.includes(list.name) ? (
              <ul>
                {list.books.map((book) => {
                  return (
                    <div key={book.isbn}>
                      <li key={book.isbn} onClick={this.clickListItem}>
                        {book.title}
                      </li>
                      <div className="separator-wrapper">
                        <div className="list-item-separator"></div>
                      </div>
                    </div>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      );
    });

    return <div className="list-container">{listsOfUser}</div>;
  }
}

export default UserList;
