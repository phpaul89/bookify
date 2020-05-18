import React, { Component } from "react";
import "../components/UserList.css";

class UserList extends Component {
  state = {
    activeLists: [],
    activeEditLists: [],
    activeSearch: false,
    addListQuery: "",
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

    const checkEditActive = this.state.activeEditLists.includes(
      event.target.getAttribute("name")
    );

    // only trigger drop-down close if edit-mode is deactivated
    // without 'checkEditActive' -> edge case: drop-down would close if user clicked in this order: 1. EDIT, 2. LIST, 3. EDIT
    // whereas drop-down would not close on 2. but activeLists gets updated anyway
    if (checkActive === true && checkEditActive === false) {
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

  clickEditList = (event) => {
    const checkActive = this.state.activeEditLists.includes(
      event.target.getAttribute("name")
    );

    if (checkActive === true) {
      const newActiveLists = this.state.activeEditLists.filter(
        (list) => list !== event.target.getAttribute("name")
      );
      this.setState({ activeEditLists: newActiveLists });
    } else {
      this.setState({
        activeEditLists: [
          ...this.state.activeEditLists,
          event.target.getAttribute("name"),
        ],
      });
    }
  };

  onClickDelFromList = (event) => {
    console.log(event.target.getAttribute("book"));
    console.log(event.target.getAttribute("list"));
    this.props.onDeleteBookFromList(
      event.target.getAttribute("book"),
      event.target.getAttribute("list")
    );
  };

  onBtnSearch = () => {
    console.log("search button clicked");
    this.setState({ activeSearch: !this.state.activeSearch });
  };

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ addListQuery: event.target.value });
  };

  onClickAddList = () => {
    this.props.onAddList(this.state.addListQuery);
    document.getElementById("inputAddList").value = "";
    this.setState({ addListQuery: "" });
  };

  onClickDeleteList = (event) => {
    console.log("Delete: ", event.target.getAttribute("name"));
    this.props.onDeleteList(event.target.getAttribute("name"));
    const newActiveLists = this.state.activeEditLists.filter(
      (list) => list !== event.target.getAttribute("name")
    );
    this.setState({ activeEditLists: newActiveLists });
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
              {this.state.activeLists.includes(list.name) ||
              this.state.activeEditLists.includes(list.name) ? (
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
              {this.state.activeLists.includes(list.name) ||
              this.state.activeEditLists.includes(list.name) ? (
                <img
                  src="/images/edit-list.png"
                  className="list-edit"
                  alt="icon-list-edit"
                  onClick={this.clickEditList}
                  name={list.name}
                />
              ) : null}
            </div>
            {this.state.activeLists.includes(list.name) ||
            this.state.activeEditLists.includes(list.name) ? (
              <ul>
                {list.books.map((book) => {
                  return (
                    <div key={book.isbn}>
                      <div className="book-group">
                        <li key={book.isbn} onClick={this.clickListItem}>
                          {book.title}
                        </li>
                        {this.state.activeEditLists.includes(list.name) ? (
                          <i
                            className="deleteBookFromList"
                            onClick={this.onClickDelFromList}
                            book={book.title}
                            list={list.name}
                          >
                            DEL
                          </i>
                        ) : null}
                      </div>

                      <div className="separator-wrapper">
                        <div className="list-item-separator"></div>
                      </div>
                    </div>
                  );
                })}
                {this.state.activeEditLists.includes(list.name) ? (
                  <div className="deleteList">
                    <i
                      className="delButton"
                      onClick={this.onClickDeleteList}
                      name={list.name}
                    >
                      Delete List
                    </i>
                  </div>
                ) : null}
              </ul>
            ) : null}
          </div>
        </div>
      );
    });

    return (
      <div className="list-container">
        <div className="lists-only">{listsOfUser}</div>
        <div className="search-only">
          {this.state.addListQuery !== "" ? (
            <img
              src="/images/plus-icon.png"
              className="btnSearch"
              alt="plus-icon"
              onClick={this.onClickAddList}
            />
          ) : (
            <img
              src="/images/plus-icon.png"
              className="btnSearch"
              alt="plus-icon"
              onClick={this.onBtnSearch}
            />
          )}

          {this.state.activeSearch === true ? (
            <input
              id="inputAddList"
              type="text"
              className="inputAddList"
              name="addList"
              placeholder=""
              onChange={this.onInputChange}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default UserList;
