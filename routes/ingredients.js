const express = require('express');
const router = express.Router();
const validateId = require('../middlewares/validateId')

const ingredientController = require('../controllers/ingredientController');

router.get('/', ingredientController.show_all_ingredient);
router.post('/', ingredientController.create_new_ingredient);
router.put('/:id', validateId, ingredientController.update_ingredient);
router.delete('/:id', validateId, ingredientController.delete_ingredient);

module.exports = router;
