var express = require('express');
var router = express.Router();
const Document = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');


// GET all documents
router.get('/', function (req, res, next) {
  Document.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Documents fetched successfully!',
        documents: documents,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured',
        error: err
      });
    });
});

// POST a new document
router.post('/', function (req, res, next) {
  const maxDocumentId = sequenceGenerator.nextId('documents');
  
  const newDocument = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  newDocument.save()
    .then((createdDocument) => {
      res.status(201).json({
        message: 'Document created successfully!',
        document: createdDocument
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured',
        error: err
      });
    });
});

// PUT update a document
router.put('/:id', function (req, res, next) {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found!'
        });
      }
      document.name = req.body.name
      document.description = req.body.description
      document.url = req.body.url

      return Document.updateOne({ id: req.params.id }, document);
    })
    .then((result) => {
      if (!result) return;

      res.status(200).json({
        message: 'Document updated successfully!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    });
});

// DELETE a document
router.delete('/:id', function (req, res, next) {
  Document.deleteOne({ id: req.params.id })
    .then(() => {
      res.status(204).json({
        message: 'Document deleted successfully!'
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured',
        error: err
      });
    });
});

module.exports = router;
