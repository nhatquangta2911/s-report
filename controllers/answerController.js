const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const Op = Sequelize.Op;
const ErrorHelper = require("../helpers/ErrorHelper");
const config = require("../config");
const { Answer, User, Ingredient, Question } = require("../startup/db");

const show_my_answers = async (req, res) => {
  // const today = new Date();
  // let dates = new Array(3);
  // for (let i = 0; i < 3; i++) {
  //   dates[i] = new Date(today.getTime() + i * 60 * 60 * 24 * 1000);
  // }
  try {
    let answers = await Answer.findAll({
      where: {
        answerTime: {
          [Op.substring]: req.params.date
        }
      },
      include: [
        {
          model: User,
          through: {
            attributes: []
          },
          where: {
            id: req.params.id
          }
        },
        Ingredient
      ]
    });
    res.json({
      total: answers.length,
      answers
    });
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_my_answers
};
