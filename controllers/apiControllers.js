const db = require("../models")

module.exports = {
  test: (req, res) => {
    res.send({ msg: "success" });
  },

  savedBooks: (req, res) => {
    db.Book.find({})
      .then(data => {
        //console.log(data);
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
  }

};