const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/info/:id', (req, res) => {
  if (req.params.id < 0) throw Object({ message: 'ahjhj' });
  res.send(req.params.id);
});

router.route('/info').get(userController.show_all_user_info);
router.route('/').get(userController.show_all_users);
router.route('/:id').get(userController.find_User);

module.exports = router;
