var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Contact = require('../models/contact');
const sequenceGenerator = require('./sequenceGenerator');


// GET all contacts
router.get('/', function (req, res, next) {
  Contact.find()
    .populate('group')
    .then((contacts) => {
      res.status(200).json({
        message: 'Contacts fetched successfully!',
        contacts: contacts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    });
});

// POST a new contact
router.post('/', function (req, res, next) {
  const maxContactId = sequenceGenerator.nextId('contacts');
  
  const newContact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
      ? req.body.group.map((contactId) => mongoose.Types.ObjectId(contactId))
      : []
  });

  newContact.save()
    .then((createdContact) => {
      res.status(201).json({
        message: 'Contact created successfully!',
        contact: createdContact
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    });
});

// PUT update a contact
router.put('/:id', function (req, res, next) {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found!'
        });
      }

      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group
        ? req.body.group.map((contactId) => mongoose.Types.ObjectId(contactId))
        : [];

      return Contact.updateOne({ id: req.params.id }, contact);
    })
    .then((result) => {
      if (!result) return;

      res.status(200).json({
        message: 'Contact updated successfully!'
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    });
});

// DELETE a contact
router.delete('/:id', function (req, res, next) {
  Contact.deleteOne({ id: req.params.id })
    .then(() => {
      res.status(204).json({
        message: 'Contact deleted successfully!'
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    });
});


module.exports = router;
