const express = require('express');
const { passport, checkAuthHeaderIdMatch, adminLoggedIn } = require(__middlewareDir + '/auth');
const contentController = require('./controller');

const router = express.Router();

router.get('/', contentController.list);
router.get('/:id', contentController.show);
router.post('/', passport.authenticate('jwt', { session: false }), checkAuthHeaderIdMatch, contentController.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), checkAuthHeaderIdMatch, contentController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkAuthHeaderIdMatch, contentController.destroy);

module.exports = router;
