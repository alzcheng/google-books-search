const router = require("express").Router();
const { test, allBooks } = require("../controllers/apiControllers");

router.get("/test", test);

router.get("/books", allBooks);
// router.post("/api/books", saveBook);
// router.delete("/api/books/:id", deleteBook);

module.exports = router; 