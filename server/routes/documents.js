var express = require('express');
var router = express.Router();

// GET all documents
router.get('/', function (req, res, next) {
    res.json({ message: 'GET all documents' });
});

// POST a new document
router.post('/', function (req, res, next) {
    res.json({ message: 'POST document' });
});

// PUT update a document
router.put('/:id', function (req, res, next) {
    res.json({ message: 'PUT document ' + req.params.id });
});

// DELETE a document
router.delete('/:id', function (req, res, next) {
    res.json({ message: 'DELETE document ' + req.params.id });
});

module.exports = router;