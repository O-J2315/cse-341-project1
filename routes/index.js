const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome to the CSE 341 Project 1 API!");
});

router.use("/contacts", require("./contacts"));
// Swagger setup
router.use("/api-docs", require("./swagger"));

module.exports = router;
