const db = require("../models")

module.exports = {
  test: (req, res) => {
    res.send({ msg: "success" });
  },

  allBooks: (req, res) => {
    db.Book.find({})
      .then(data => {
        console.log(data);
        res.send({ allbooks: data });
      })
      .catch(err => {
        console.error(err);
      })
  },

  // saveBook: (req, res) => {

  // },

  // deleteBook: (req, res) => {

  // }
};