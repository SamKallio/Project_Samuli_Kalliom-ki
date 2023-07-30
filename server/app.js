var express = require("express");
require("dotenv").config();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
//const cors = require("cors");

//Set up mongoDB and Mongoose connections
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error!")); //If there was a connection error, we will know

var userRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//This is the primary router
app.use("/api", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("..", "client", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve("..", "client", "build", "index.html"))
  );
} else if (process.env.NODE_ENV === "development") {
  var corsOptions = {
    origin: "http:localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}

module.exports = app;
