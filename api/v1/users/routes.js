const express = require('express');
const { passport, checkAuthHeaderIdMatch } = require(__middlewareDir + '/auth');
const userController = require('./controller');

const router = express.Router();
router.use(passport.initialize());

router.post('/signup', userController.signup);
router.post('/login', userController.login)
router.put('/:id', passport.authenticate('jwt', { session: false }), checkAuthHeaderIdMatch, userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;
