const express = require('express');
const userController = require('./controller');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login)
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;
