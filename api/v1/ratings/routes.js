const express = require('express');
const { passport, checkAuthHeaderIdMatch } = require(__middlewareDir + '/auth');
const ratingController = require('./controller');

const router = express.Router();
router.use(passport.initialize());

router.get('/:id', ratingController.show);
router.post('/', passport.authenticate('jwt', { session: false }), checkAuthHeaderIdMatch, ratingController.create);

module.exports = router;
