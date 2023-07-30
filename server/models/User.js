const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//This is the base information for our user which we will be handing to MongoDB
let userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  rank: { type: Number, default: 0 },
});

module.exports = mongoose.model("user", userSchema);
