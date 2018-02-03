const express = require('express');
const contentController = require('./contentController');

const router = express.Router();

router.get('/', contentController.list);
router.get('/:id', contentController.show);
router.post('/', contentController.create);

module.exports = router;
