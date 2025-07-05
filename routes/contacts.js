const express = require('express');
const router = express.Router();

const usersController = require('../controllers/contacts');


router.get('/contacts', usersController.getAllContacts);
router.get('/:id', usersController.getContactById);

module.exports = router;
