const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { Question, Ingredient, TypeQuestion } = require('../startup/db');

const show_all_questions = async (req, res) => {
  try {
    let questions = await Question.findAll({
      include: [Ingredient, TypeQuestion]
    });
    res.json(questions);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_questions
};
