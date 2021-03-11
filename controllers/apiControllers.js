const db = require("../models");
const axios = require("axios");
require('dotenv').config();

module.exports = {

  savedBooks: (req, res) => {
    db.Book.find({})
      .then(data => {
        res.send({ savedbooks: data });
      })
      .catch(err => {
        console.error(err);
      })
  },

  saveBook: (req, res) => {
    const newBook = req.body;

    db.Book.insertMany(newBook)
      .then(data => {
        if (data) {
          console.log("element created");
          res.send({ msg: "element created" });
        }
      })
      .catch(err => {
        console.error(err);
      });

  },

  deleteBook: (req, res) => {
    db.Book.deleteOne({ _id: req.params.id })
      .then(data => {
        console.log("item removed");
        res.send({ msg: "deleted" })
      })
      .catch(err => {
        console.error(err);
      })
  },

  getBooks: async (req, res) => {
    try {
      const myResult = req.body.result;
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${myResult}&key=${process.env.API_KEY}`);
      res.send(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }
};