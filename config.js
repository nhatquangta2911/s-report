require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  DIALECT: process.env.DIALECT
};
