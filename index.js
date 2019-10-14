/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const express = require('express');
const config = require('./config');
// const { logger } = require('./startup/logging');

const app = express();

// require('./startup/logging')();
require('./startup/routes')(app);

const port = config.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`SERVER STARTED AT PORT ${port}...`);
});

module.exports = server;
