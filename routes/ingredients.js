const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredientController');

router.get('/', ingredientController.show_all_ingredient);
router.post('/', ingredientController.create_new_ingredient);

module.exports = router;
