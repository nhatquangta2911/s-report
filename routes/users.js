const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/auth');

router.get('/', userController.show_all_users);
// router.get('/:id', validateId, userController.find_User);

router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/special', auth(['admin']), (req, res) => res.json('Works!'));

module.exports = router;
