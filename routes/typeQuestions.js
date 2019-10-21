const express = require('express');
const router = express.Router();

const typeQuestionController = require('../controllers/typeQuestionController');

router.route('/').get(typeQuestionController.show_all_type);

module.exports = router;
