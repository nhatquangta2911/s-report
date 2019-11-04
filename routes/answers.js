const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController');

router.get('/:id', answerController.show_my_answers)