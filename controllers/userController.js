const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { User, InfoUser, Role } = require('../startup/db');

const show_all_user_info = async (req, res) => {
  try {
    let infoUsers = await InfoUser.findAll({
      where: { goal2: { [Op.gte]: 2 } }
    });
    res.json(infoUsers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const find_User = async (req, res) => {
  try {
    let user = await User.findOne({ where: { id: req.params.id } });
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
          model: InfoUser,
          attributes: ['id', 'weight', 'height', 'gender']
        },
        {
          model: Role,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ],
      limit: 4
    });
    res.json(users);
  } catch (error) {
    logger.error(error.message, error);
    res.status(400).json('Something went wrong.');
  }
};

module.exports = {
  show_all_user_info,
  show_all_users,
  find_User
};
