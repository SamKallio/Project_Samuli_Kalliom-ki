const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//This is the base information for our posts which we will be handing to MongoDB
let postsSchema = new Schema({
  title: { type: String },
  textContent: { type: String },
  date: { type: String },
  username: { type: String },
});

module.exports = mongoose.model("posts", postsSchema);
