const Sequelize = require('sequelize');
const config = require('../config');
const { logger } = require('../middlewares/logging');
const Op = Sequelize.Op;
const { User, InfoUser } = require('../startup/db');

const show_all_user_info = async (req, res) => {
  try {
    let infoUsers = await InfoUser.findAll({ limit: 5 });
    res.status(200).json(infoUsers);
  } catch (error) {
    logger.error(error.message, error);
    res.status(400).json('Something went wrong.');
  }
};

module.exports = {
  show_all_user_info
};
