const Sequelize = require('sequelize');
const config = require('../config');
const Op = Sequelize.Op;
const { User, InfoUser } = require('../startup/db');

const show_all_user_info = async (req, res) => {
  try {
    let infoUsers = await InfoUser.findAll({ limit: 5 });
    console.log('yahoooo');
    res.status(200).json(infoUsers);
  } catch (error) {
    res.status(400).json('Something went wrong.');
    //TODO: Handle error (find best solution)
    //TODO: Add response helpers
    console.log(config);
  }
};

module.exports = {
  show_all_user_info
};
