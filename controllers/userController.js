const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const ErrorHelper = require('../helpers/ErrorHelper');
const config = require('../config');
const { User, InfoUser } = require('../startup/db');

const show_all_user_info = async (req, res) => {
  try {
    let infoUsers = await InfoUser.findAll({
      where: { goal: { [Op.gte]: 2 } }
    });
    res.json(infoUsers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res);
  }
};

const show_all_users = async (req, res) => {
  try {
    let users = await User.findAll({
      // include: [InfoUser],
      include: [
        {
          attributes: ['id', 'weight', 'height', 'gender'],
          model: InfoUser
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
  show_all_users
};
