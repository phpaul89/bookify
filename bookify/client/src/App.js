import React from "react";
import "./App.css";

// adding components:
import BookList from "./components/BookList.js";

function App() {
  return (
    <div className="App">
      <div className="helloWorld">Hello World!</div>
      <BookList />
    </div>
  );
}

export default App;
