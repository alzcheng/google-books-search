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
    const newBook = {
      authors: ["Suzanne Collins"],
      description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
      image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
      title: "The Hunger Games"
    };

    db.Book.insertMany(newBook)
      .then(data => {
        console.log(data);
        res.send({ msg: "element created" })
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
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