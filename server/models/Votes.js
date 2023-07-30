const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//This is the base information for our votes which we will be handing to MongoDB
let votesSchema = new Schema({
  voteId: { type: String },
  votes: { type: Number },
  users: [{ type: String }],
});

module.exports = mongoose.model("votes", votesSchema);
