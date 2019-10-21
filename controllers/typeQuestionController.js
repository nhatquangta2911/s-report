const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { TypeQuestion } = require('../startup/db');

const show_all_type = async (req, res) => {
  try {
    let types = await TypeQuestion.findAll();
    res.json(types);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_type
};
