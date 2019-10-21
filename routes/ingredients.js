const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredientController');

router.route('/').get(ingredientController.show_all_ingredient);

module.exports = router;
