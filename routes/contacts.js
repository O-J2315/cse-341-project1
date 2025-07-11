const express = require("express");
const router = express.Router();

const usersController = require("../controllers/contacts");

router.get("/contacts", usersController.getAllContacts);
router.get("/:id", usersController.getContactById);

router.post("/contacts", usersController.createContact);
router.put("/:id", usersController.updateContactById);
router.delete("/:id", usersController.deleteContactById);

module.exports = router;
