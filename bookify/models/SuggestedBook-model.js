const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suggestedBookSchema = new mongoose.Schema(
  {
    title: { type: String },
    by: { type: String },
    year: { type: String },
    cover: { type: Object },
    url: { type: String },
    suggestedBy: { type: String },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("SuggestedBook", suggestedBookSchema);
module.exports = Book;
