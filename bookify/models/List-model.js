const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: String },
  books: [{ type: Schema.Types.ObjectID, ref: "Book" }],
});

const List = mongoose.model("List", listSchema);
module.exports = List;
