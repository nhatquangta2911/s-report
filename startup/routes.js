/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const home = require('../routes/home');

module.exports = app => {
  app.use(cors({ origin: '*', credentials: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cookieParser());
  app.use('/', home);
};
