const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { Answer, Ingredient } = require('../startup/db');

const show_my_answers = async (req, res) => {
  try {
    let answers = await Answer.findAll({
    //   include: [Ingredient, TypeQuestion],
      where: {
        userId: req.params.id
      }
    });
    res.json(answers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_my_answers
};
