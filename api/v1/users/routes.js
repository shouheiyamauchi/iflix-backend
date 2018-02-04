const express = require('express');
const userController = require('./controller');
const auth = require(__middlewareDir + '/auth');

const router = express.Router();
router.use(auth.initialize());

router.post('/signup', userController.signup);
router.post('/login', userController.login)
router.put('/:id', auth.authenticate('jwt', { session: false }), userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;
