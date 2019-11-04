const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');

router.get('/:id', questionController.show_my_questions);

module.exports = router;
