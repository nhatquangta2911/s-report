/* eslint-disable quotes */
require('express-async-errors');
const { logger } = require('../middlewares/logging');

module.exports = () => {
  logger.info('Starting application...');
  process.on('uncaughtException', ex => {
    logger.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', ex => {
    logger.error(ex.message, ex);
    process.exit(1);
  });
};
