/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const home = require('../routes/home');
const users = require('../routes/users');
const ingredients = require('../routes/ingredients');
const typeQuestions = require('../routes/typeQuestions');
const questions = require('../routes/questions');
const answers = require('../routes/answers');
const error = require('../middlewares/error');

module.exports = app => {
  app.use(fileUpload({ createParentPath: true }));
  app.use(cors({ origin: '*', credentials: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
    );
    next();
  });

  app.use('/', home);
  app.use('/api/users', users);
  app.use('/api/typeQuestions', typeQuestions);
  app.use('/api/questions', questions);
  app.use('/api/ingredients', ingredients);
  app.use('/api/users', answers)

  app.use(error);
};
