const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialBookSchema = new mongoose.Schema(
  {
    isbn: { type: String },
    title: { type: String },
    by: { type: String },
    year: { type: String },
    cover: { type: Object },
    url: { type: String },
    suggestedBy: { type: String },
    comments: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const SpecialBook = mongoose.model("SpecialBook", specialBookSchema);
module.exports = SpecialBook;
