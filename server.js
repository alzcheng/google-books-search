//Setup express servers and mongoose db
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

//Being able to use the url in objects
app.use(express.urlencoded({ extended: true }));
//Being able to use JSON objects
app.use(express.json());

//In production code, use client/build as static
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api", require("./routes/apiRoutes"));

//Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));