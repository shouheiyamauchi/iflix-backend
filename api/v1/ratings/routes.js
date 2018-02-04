const express = require('express');
const auth = require(__middlewareDir + '/auth');
const ratingController = require('./controller');

const router = express.Router();
router.use(auth.initialize());

router.get('/:id', ratingController.show);
router.post('/', auth.authenticate('jwt', { session: false }), ratingController.create);

module.exports = router;
