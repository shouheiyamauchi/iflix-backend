const express = require('express');
const ratingController = require('./controller');

const router = express.Router();

router.get('/:id', ratingController.show);
router.post('/', ratingController.create);

module.exports = router;
