/* eslint-disable no-unused-vars */
const { logger } = require('../startup/logging');

module.exports = (err, req, res, next) => {
  logger.log('error', err.message, err);
  res.status(500).send('Something went wrong.');
};
