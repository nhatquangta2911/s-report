const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { Ingredient } = require('../startup/db');

const show_all_ingredient = async (req, res) => {
  try {
    let ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_ingredient
};
