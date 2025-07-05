const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  const contacts = await mongodb.getDb().collection('Contacts').find();
  contacts.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  }).catch(() => {
    res.status(500).json({ message: 'Error retrieving contacts' });
  });
}

const getContactById = async (req, res) => {
  const id = req.params.id;
  console.log(`🔍 Fetching contact with ID: ${id}`);

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID format' });
  }

  const contactId = new ObjectId(id);

  try {
    const contact = await mongodb.getDb().collection('Contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contact', error: err.message });
  }
};


module.exports = {
  getAllContacts,
  getContactById
};