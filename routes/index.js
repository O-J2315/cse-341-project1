const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the CSE 341 Project 1 API!');
});

module.exports = router;