const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const Op = Sequelize.Op;
const ErrorHelper = require("../helpers/ErrorHelper");
const config = require("../config");
const { Question, Ingredient, TypeQuestion, User } = require("../startup/db");

const show_my_questions = async (req, res) => {
  try {
    let questions = await Question.findAll({
      include: [
        TypeQuestion,
        { model: Ingredient, through: { attributes: [] } }
      ],
      where: {
        userId: req.params.id
      }
    });
    if (questions.length === 0) ErrorHelper.BadRequest(res, "User Not Found.");
    res.json(questions);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const add_question = async (req, res) => {
  try {
    const userId = req.headers["id"];
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return ErrorHelper.BadRequest(res, "User Not Found.");
    let question = await Question.create({
      typeQuestionId: req.body.typeQuestionId,
      userId: userId,
      amount: req.body.amount,
      extraInfo: req.body.extraInfo
    });
    if (!req.body.ingredients || req.body.ingredients.length === 0)
      ErrorHelper.BadRequest(res, "Question Has No Ingredients");
    await question.addIngredients(req.body.ingredients);
    res.json(question);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_my_questions,
  add_question
};
