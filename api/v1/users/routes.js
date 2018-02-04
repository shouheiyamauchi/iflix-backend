const express = require('express');
const auth = require(__middlewareDir + '/auth');
const userController = require('./controller');

const router = express.Router();
router.use(auth.initialize());

router.post('/signup', userController.signup);
router.post('/login', userController.login)
router.put('/:id', auth.authenticate('jwt', { session: false }), userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;
