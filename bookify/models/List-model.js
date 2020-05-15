const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: Schema.Types.ObjectID, ref: "User" },
  books: [{ type: Schema.Types.ObjectID, ref: "Book" }],
});

const List = mongoose.model("List", listSchema);
module.exports = List;
