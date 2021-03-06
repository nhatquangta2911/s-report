const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { User, InfoUser, Role, Answer, Doctor } = require('../startup/db');

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
    if (!user) return ErrorHelper.NotFound(res, 'User Not Found.');
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
          model: InfoUser
        },
        {
          model: Doctor
        },
        {
          model: Role,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    });
    res.json(users);
  } catch (error) {
    logger.error(error.message, error);
    res.status(400).json('Something went wrong.');
  }
};

const answer_question = async (req, res) => {
  try {
    const userId = req.headers['id'];
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return ErrorHelper.BadRequest(res, 'User Not Found.');
    const answer = await Answer.create({
      answerContent: req.body.answerContent,
      positiveId: req.body.positiveId
    });
    if (!req.body.ingredients || req.body.ingredients.length === 0)
      ErrorHelper.BadRequest(res, 'Answer Has No Ingredients.');
    await answer.addIngredients(req.body.ingredients);
    await user.addAnswers([answer]);
    res.json(answer);
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

const add_doctor = async (req, res) => {
  try {
    const userId = req.headers['id'];
    let user = await User.findOne({ where: { id: userId } });
    if (!user) return ErrorHelper.BadRequest(res, 'User not found.');
    const result = await User.update(
      {
        ...user,
        doctorId: req.body.doctorId
      },
      { where: { id: userId } }
    );
    res.json(result);
  } catch (error) {
    ErrorHelper.InternalServerError(res, error);
  }
};

const add_password_for_admin = async (req, res) => {
  try {
    const userId = req.headers['id'];
    let user = await User.findOne({ where: { id: userId } });
    if (!user) return ErrorHelper.BadRequest(res, 'User not found.');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const result = await User.update(
      {
        ...user,
        password
      },
      { where: { id: userId } }
    );
    res.json(result);
  } catch (error) {
    ErrorHelper.InternalServerError(res, error);
  }
};

const active_user = async (req, res) => {
  try {
    const userId = req.headers['id'];
    let user = await User.findOne({ where: { id: userId } });
    if (!user) return ErrorHelper.BadRequest(res, 'User not found.');
    const result = await User.update(
      { ...user, status: 1 },
      { where: { id: userId } }
    );
    res.json(result);
  } catch (error) {
    ErrorHelper.InternalServerError(res, error);
  }
};

const ban_user = async (req, res) => {
  try {
    const userId = req.headers['id'];
    let user = await User.findOne({ where: { id: userId } });
    if (!user) return ErrorHelper.BadRequest(res, 'User not found.');
    const result = await User.update(
      { ...user, status: 0 },
      { where: { id: userId } }
    );
    res.json(result);
  } catch (error) {
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  add_doctor,
  add_password_for_admin,
  show_all_user_info,
  show_all_users,
  find_User,
  answer_question,
  active_user,
  ban_user
};
