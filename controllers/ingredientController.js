const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const Joi = require('@hapi/joi');
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { Ingredient } = require('../startup/db');
const { upload } = require('../helpers/UploadToS3Helper');

const show_all_ingredient = async (req, res) => {
  try {
    let ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const create_new_ingredient = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return ErrorHelper.BadRequest(res, error);
  const file = req.files.file;
  if (!file) {
    ErrorHelper.BadRequest(res, 'No File Uploaded.');
  } else {
    if (file.size < 5 * 1024 * 1024) {
      upload(res, file, async data => {
        try {
          const ingredient = await Ingredient.create({
            name: req.body.name,
            cal: req.body.cal,
            carbs: req.body.carbs,
            protein: req.body.protein,
            fiber: req.body.fiber,
            sugar: req.body.sugar,
            fat: req.body.fat,
            description: req.body.description,
            image: data
          });
          res.json(ingredient);
        } catch (error) {
          logger.error(error.message, error);
          ErrorHelper.InternalServerError(res, error);
        }
      });
    }
  }
};

const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .required(),
  cal: Joi.number()
    .min(0)
    .max(10000),
  carbs: Joi.number()
    .min(0)
    .max(10000),
  protein: Joi.number()
    .min(0)
    .max(10000),
  sugar: Joi.number()
    .min(0)
    .max(10000),
  fiber: Joi.number()
    .min(0)
    .max(10000),
  fat: Joi.number()
    .min(0)
    .max(10000),
  description: Joi.string()
    .min(10)
    .max(2500),
  image: Joi.string()
    .min(10)
    .max(2500)
});

module.exports = {
  show_all_ingredient,
  create_new_ingredient
};
