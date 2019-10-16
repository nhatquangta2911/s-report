const express = require('express');
const config = require('./config');
const { logger } = require('./middlewares/logging');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = config.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`SERVER STARTED AT PORT ${port}...`);
});

module.exports = server;
