const express = require('express');
const ratingController = require('./controller');

const router = express.Router();

router.post('/', ratingController.create);

module.exports = router;
