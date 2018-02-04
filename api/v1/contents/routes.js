const express = require('express');
const contentController = require('./controller');

const router = express.Router();

router.get('/', contentController.list);
router.get('/:id', contentController.show);
router.post('/', contentController.create);
router.put('/:id', contentController.update);
router.delete('/:id', contentController.destroy);

module.exports = router;
