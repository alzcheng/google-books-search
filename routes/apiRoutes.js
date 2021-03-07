const router = require("express").Router();
const { test } = require("../controllers//apiControllers");

router.get("/test", test);

module.exports = router; 