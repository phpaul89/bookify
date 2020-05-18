const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    //lists: [{ type: Schema.Types.ObjectID, ref: "List" }], // not needed right now -> list has 'owner' property
    suggestedBooks: [{ type: Schema.Types.ObjectId, ref: "SuggestedBook" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
