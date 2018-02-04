const express = require('express');
const userController = require('./controller');

const router = express.Router();

router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);

module.exports = router;
