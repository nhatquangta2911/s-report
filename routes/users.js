const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/auth');

router.get('/', userController.show_all_users);
router.get('/user/:id', validateId, userController.find_User);

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/info/:id', authController.register_info);

router.get('/special', auth(['admin']), (req, res) => res.json('Works!'));
router.post('/upload', authController.demoUpload);

router.post('/submit', userController.answer_question);
router.post('/doctor', userController.add_doctor);
router.post('/password', userController.add_password_for_admin);
router.post('/active', userController.active_user);
router.post('/ban', userController.ban_user);

module.exports = router;
