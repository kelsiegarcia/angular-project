var express = require('express');
var router = express.Router();

// GET all contacts
router.get('/', function (req, res, next) {
    res.json({ message: 'GET all contacts' });
});

// POST a new contact
router.post('/', function (req, res, next) {
    res.json({ message: 'POST contact' });
});

// PUT update a contact
router.put('/:id', function (req, res, next) {
    res.json({ message: 'PUT contact ' + req.params.id });
});

// DELETE a contact
router.delete('/:id', function (req, res, next) {
    res.json({ message: 'DELETE contact ' + req.params.id });
});

module.exports = router;