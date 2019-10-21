const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');

router.route('/').get(questionController.show_all_questions);

module.exports = router;
