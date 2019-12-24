const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.get('/', tokenController.show_all_tokens);
router.post('/', tokenController.add_token);

module.exports = router;
