const mongoose = require("mongoose");

let database = mongoose.connect(
  "mongodb+srv://Muhammad:Muhammad@cluster0-oset3.mongodb.net/test?retryWrites=true&w=majority",
  { userNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("Connected to MongoDB");
  }
);

module.exports = database;
