const express = require("express");
const config = require("./config");
const { logger } = require("./middlewares/logging");

const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/prod")(app);
require("./startup/cron");

const port = config.PORT || 80;

const server = app.listen(port, () => {
  logger.info(`SERVER STARTED AT PORT ${port}...`);
});

module.exports = server;
