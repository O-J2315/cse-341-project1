const express = require("express");
const router = express.Router();

const usersController = require("../controllers/contacts");

// Get all contacts
router.get("/contacts", usersController.getAllContacts);
// Get a contact by ID
router.get("/:id", usersController.getContactById);

//Add a new contact
router.post("/", usersController.createContact);
// Update a contact by ID
router.put("/:id", usersController.updateContactById);
// Delete a contact by ID
router.delete("/:id", usersController.deleteContactById);

module.exports = router;
