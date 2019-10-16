require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  //TODO: process.env.USERNAME was duplicated with window username
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST
};
