const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//This is the base information for our comments which we will be handing to MongoDB
let commentsSchema = new Schema({
  postId: { type: String },
  textContent: { type: String },
  date: { type: Date },
  username: { type: String },
});

module.exports = mongoose.model("comments", commentsSchema);
