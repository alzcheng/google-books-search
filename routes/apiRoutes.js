const router = require("express").Router();
const { test, savedBooks, deleteBook, saveBook } = require("../controllers/apiControllers");

router.get("/test", test);

router.get("/books", savedBooks);
router.post("/books", saveBook);
router.delete("/books/:id", deleteBook);

module.exports = router; 