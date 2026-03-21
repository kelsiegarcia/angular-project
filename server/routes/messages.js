var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');


// GET all messages
router.get('/', function (req, res, next) {
  Message.find()
    .then((messages) => {
      res.status(200).json({
        message: 'messages fetched successfully!',
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured',
        error: err
      });
    });
});

// POST a new message
router.post('/', function (req, res, next) {
  const newMessageId = sequenceGenerator.nextId('messages');
  
  const newMessage = new Message({
    id: newMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  newMessage.save()
    .then((createdMessage) => {
      res.status(201).json({
        message: 'message created successfully!',
        message: createdMessage
      });
    })
    .catch((err) => {
      res.status(201).json({
        message: 'Message created successfully!',
        newMessage: createdMessage
      });
    });
});

// PUT update a message
router.put('/:id', function (req, res, next) {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      if (!message) {
        return res.status(404).json({
          message: 'message not found!'
        });
      }
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      return Message.updateOne({ id: req.params.id }, message);
    })
    .then((result) => {
      if (!result) return;

      res.status(200).json({
        message: 'message updated successfully!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    });
});

// DELETE a message
router.delete('/:id', function (req, res, next) {
  Message.deleteOne({ id: req.params.id })
    .then(() => {
      res.status(204).json({
        message: 'Message deleted successfully!'
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

