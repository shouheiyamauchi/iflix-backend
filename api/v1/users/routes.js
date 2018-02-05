const express = require('express');
const { passport, checkAuthHeaderIdMatch, adminLoggedIn } = require(__middlewareDir + '/auth');
const userController = require('./controller');

const router = express.Router();
router.use(passport.initialize());

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/:id', passport.authenticate('jwt', { session: false }), checkAuthHeaderIdMatch, userController.update);
router.post('/change-role', passport.authenticate('jwt', { session: false }), adminLoggedIn, userController.changeRole);
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkAuthHeaderIdMatch, userController.destroy);

module.exports = router;
