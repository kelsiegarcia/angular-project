var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

// GET all messages
router.get('/', function (req, res, next) {
  Message.find().populate('sender')
    .then((messages) => {
      res.status(200).json({
        message: 'messages fetched successfully!',
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    });
});

// POST a new message
router.post('/', async function (req, res, next) {
  try {
    if (!req.body.subject || !req.body.msgText) {
      return res.status(400).json({
        message: 'Subject and message text are required'
      });
    }
    const newMessageId = sequenceGenerator.nextId('messages');

    let senderId = null;

    if (req.body.sender) {
      const contact = await Contact.findOne({ id: req.body.sender });

      if (!contact) {
        return res.status(400).json({
          message: 'Sender contact not found'
        });
      }

      senderId = contact._id;
    }

    const newMessage = new Message({
      id: newMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: senderId
    });

    const createdMessage = await newMessage.save();
    console.log('req.body =', req.body);
    res.status(201).json({
      message: 'Message created successfully!',
      messageObject: createdMessage
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred',
      error: err
    });
  }
});

// PUT update a message
router.put('/:id', async function (req, res, next) {
  try {
    const message = await Message.findOne({ id: req.params.id });

    if (!message) {
      return res.status(404).json({
        message: 'Message not found!'
      });
    }

    let senderId = null;

    if (req.body.sender) {
      const contact = await Contact.findOne({ id: req.body.sender });

      if (!contact) {
        return res.status(400).json({
          message: 'Sender contact not found'
        });
      }

      senderId = contact._id;
    }

    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = senderId;

    await Message.updateOne({ id: req.params.id }, message);

    res.status(200).json({
      message: 'Message updated successfully!'
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred',
      error: err
    });
  }
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