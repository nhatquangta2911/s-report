const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const Op = Sequelize.Op;
const ErrorHelper = require("../helpers/ErrorHelper");
const config = require("../config");
const { User, InfoUser, Role, Answer } = require("../startup/db");

const show_all_user_info = async (req, res) => {
  try {
    let infoUsers = await InfoUser.findAll({
      where: { goal: { [Op.gte]: 2 } }
    });
    res.json(infoUsers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const find_User = async (req, res) => {
  try {
    let user = await User.findOne({
      where: { id: req.params.id },
      include: [InfoUser]
    });
    if (!user) return ErrorHelper.NotFound(res, "User Not Found.");
    res.send(user);
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_all_users = async (req, res) => {
  try {
    let users = await User.findAll({
      // include: [InfoUser],
      include: [
        {
          model: InfoUser,
          attributes: ["id", "weight", "height", "gender"]
        },
        {
          model: Role,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      ]
    });
    res.json(users);
  } catch (error) {
    logger.error(error.message, error);
    res.status(400).json("Something went wrong.");
  }
};

const answer_question = async (req, res) => {
  try {
    const userId = req.headers["id"];
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return ErrorHelper.BadRequest(res, "User Not Found.");
    const answer = await Answer.create({
      answerContent: req.body.answerContent,
      positiveId: req.body.positiveId
    });
    if (!req.body.ingredients || req.body.ingredients.length === 0)
      ErrorHelper.BadRequest(res, "Answer Has No Content.");
    await answer.addIngredients(req.body.ingredients);
    await user.addAnswer([answer]);
    res.json(answer);
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_user_info,
  show_all_users,
  find_User,
  answer_question
};
