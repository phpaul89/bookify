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
    // .getAttribute("name") here instead of .name!
    const checkActive = this.state.activeLists.includes(
      event.target.getAttribute("name")
    );

    if (checkActive === true) {
      const newActiveLists = this.state.activeLists.filter(
        (list) => list !== event.target.getAttribute("name")
      );
      this.setState({ activeLists: newActiveLists });
    } else {
      this.setState({
        activeLists: [
          ...this.state.activeLists,
          event.target.getAttribute("name"),
        ],
      });
    }
  };

  render() {
    const listsOfUser = this.props.lists.map((list) => {
      return (
        <div key={list.name} className="list-group">
          <div className="list">
            <div
              className="arrowListName"
              onClick={this.clickList}
              name={list.name}
            >
              {this.state.activeLists.includes(list.name) ? (
                <i
                  className="arrow down"
                  onClick={this.clickList}
                  name={list.name}
                ></i>
              ) : (
                <i
                  className="arrow right"
                  onClick={this.clickList}
                  name={list.name}
                ></i>
              )}
              <p key={list.name} onClick={this.clickList} name={list.name}>
                {list.name}
              </p>
            </div>
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
