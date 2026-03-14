var express = require('express');
var router = express.Router();

// GET all messages
router.get('/', function (req, res, next) {
    res.json({ message: 'GET all messages' });
});

// POST a new message
router.post('/', function (req, res, next) {
    res.json({ message: 'POST message' });
});

// PUT update a message
router.put('/:id', function (req, res, next) {
    res.json({ message: 'PUT message ' + req.params.id });
});

// DELETE a message
router.delete('/:id', function (req, res, next) {
    res.json({ message: 'DELETE message ' + req.params.id });
});

module.exports = router;