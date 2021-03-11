const router = require("express").Router();
const { savedBooks, deleteBook, saveBook, getBooks } = require("../controllers/apiControllers");

router.get("/books", savedBooks);
router.post("/books", saveBook);
router.delete("/books/:id", deleteBook);
router.post("/getGoogleBooks", getBooks);

module.exports = router; 