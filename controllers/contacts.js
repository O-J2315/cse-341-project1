const mongodb = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  const contacts = await mongodb.getDb().collection("Contacts").find();
  contacts
    .toArray()
    .then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving contacts" });
    });
};

const getContactById = async (req, res) => {
  const id = req.params.id;
  console.log(`🔍 Fetching contact with ID: ${id}`);

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }

  const contactId = new ObjectId(id);

  try {
    const contact = await mongodb
      .getDb()
      .collection("Contacts")
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving contact", error: err.message });
  }
};

const createContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id); // Generate a new ObjectId for the contact

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  console.log("📥 Creating contact:", contact);
  try {
    const result = await mongodb
      .getDb()
      .collection("Contacts")
      .insertOne(contact);
    res
      .status(201)
      .json({ message: "Contact created successfully", id: result.insertedId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating contact", error: err.message });
  }
};

const updateContactById = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  console.log("✏️ Updating contact:", contactId, updatedContact);

  try {
    const result = await mongodb.getDb().collection("Contacts").updateOne(
      { _id: contactId }, // filter
      { $set: updatedContact }, // update only specified fields
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating contact", error: err.message });
  }
};

const deleteContactById = async (req, res) => {
  const id = req.params.id;
  console.log(`🗑️ Deleting contact with ID: ${id}`);
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }
  const contactId = new ObjectId(id);
  try {
    const result = await mongodb
      .getDb()
      .collection("Contacts")
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
};
