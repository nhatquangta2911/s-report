const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const Op = Sequelize.Op;
const ErrorHelper = require("../helpers/ErrorHelper");
const config = require("../config");
const { Answer, User, Ingredient, Question } = require("../startup/db");

const show_my_answers = async (req, res) => {
  try {
    let answers = await Answer.findAll({
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
    if (answers.length === 0)
      ErrorHelper.BadRequest(
        res,
        "User Not Found or User Did Not Answer Any Questions."
      );
    res.json(answers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_my_answers
};
