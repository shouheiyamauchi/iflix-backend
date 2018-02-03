const express = require('express');
const contentController = require('./contentController');

const router = express.Router();

router.post('/', contentController.create);

module.exports = router;
