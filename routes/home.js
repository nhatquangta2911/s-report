/* eslint-disable radix */
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page.');
});

router.get('/info/:id', (req, res) => {
  if (req.params.id < 0) throw Object({ message: 'ahjhj' });
  res.send(req.params.id);
});

module.exports = router;
