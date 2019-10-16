const Sequelize = require('sequelize');
const config = require('../config.js');

const UserModel = require('../models/user');
const InfoUserModel = require('../models/infoUser');

// var dbConfig = {
//   username: config.USERNAME,
//   password: config.PASSWORD,
//   database: config.DATABASE,
//   host: config.HOST,
//   dialect: 'mysql',
//   define: {
//     charset: 'utf8mb4',
//     collate: 'utf8mb4_unicode_520_ci',
//     timestamps: false
//   }
// };

var dbConfig = {
  username: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  host: config.HOST,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_520_ci',
    timestamps: false
  }
};

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

db.sync();

const User = UserModel(db, Sequelize);
const InfoUser = InfoUserModel(db, Sequelize);

// InfoUser.belongsTo(User);
// User.hasOne(InfoUser);

const fakeDB = async () => {
  let infoUser = await InfoUser.create({
    weight: 58,
    height: 169,
    gender: 'Male',
    bodyFat: 2,
    goal: 2,
    activityLevel: 3,
    dietType: 1
  });
};

module.exports = {
  User,
  InfoUser
};
