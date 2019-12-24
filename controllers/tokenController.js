const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { ExpiredToken } = require('../startup/db');

const show_all_tokens = async (req, res) => {
  try {
    let tokens = await ExpiredToken.findAll();
    res.json(tokens);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const add_token = async (req, res) => {
  try {
    let token = await ExpiredToken.create({
      token: req.body.token
    });
    res.json(token);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_tokens,
  add_token
};
