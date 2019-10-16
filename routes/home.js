/* eslint-disable radix */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('Home Page.');
});

router.get('/info/:id', (req, res) => {
  if (req.params.id < 0) throw Object({ message: 'ahjhj' });
  res.send(req.params.id);
});

router.route('/userInfo').get(userController.show_all_user_info);
router.route('/user').get(userController.show_all_users);

module.exports = router;
