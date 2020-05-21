const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: { type: String },
  title: { type: String },
  by: { type: String },
  year: { type: String },
  cover: { type: Object },
  url: { type: String },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
