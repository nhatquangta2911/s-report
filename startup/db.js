const Sequelize = require('sequelize');
const config = require('../config');

const config = {
  username: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  host: config.HOST,
  dialect: config.DIALECT,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_520_ci',
    timestamps: false
  }
};

const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
