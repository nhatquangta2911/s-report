const Sequelize = require('sequelize');
const config = require('../config.js');
const { logger } = require('../middlewares/logging');

const UserModel = require('../models/user');
const InfoUserModel = require('../models/infoUser');

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

const beDummyData = true;
db.sync({
  force: beDummyData
}).then(() => {
  logger.info('[SYNCED] DATABASE & TABLES CREATED ');
  if (beDummyData) {
    applyDummy();
  }
});

const User = UserModel(db, Sequelize);
const InfoUser = InfoUserModel(db, Sequelize);

User.hasOne(InfoUser);
InfoUser.belongsTo(User);

const applyDummy = async () => {
  let user1 = await User.create({
    email: 'shawn@enclave.vn',
    phone: '0368080534'
  });
  let user2 = await User.create({
    email: 'ben@enclave.vn',
    phone: '0776402587'
  });
  let user3 = await User.create({
    email: 'lionel@enclave.vn',
    phone: '01234445544'
  });
  let user4 = await User.create({
    email: 'arthur@enclave.vn',
    phone: '01298877772'
  });
  let user5 = await User.create({
    email: 'kendis@enclave.vn',
    phone: '0904988982'
  });
  let infoUser1 = await InfoUser.create({
    weight: 57,
    height: 169,
    gender: 'Female',
    bodyFat: 2,
    goal: 2,
    activityLevel: 3,
    dietType: 1,
    userId: user1.id
  });
  let infoUser2 = await InfoUser.create({
    weight: 88,
    height: 175,
    gender: 'Male',
    bodyFat: 3,
    goal: 1,
    activityLevel: 1,
    dietType: 1,
    userId: user2.id
  });
  let infoUser3 = await InfoUser.create({
    weight: 48,
    height: 155,
    gender: 'Male',
    bodyFat: 2,
    goal: 1,
    activityLevel: 3,
    dietType: 1,
    userId: user3.id
  });
  let infoUser4 = await InfoUser.create({
    weight: 68,
    height: 173,
    gender: 'Female',
    bodyFat: 2,
    goal: 2,
    activityLevel: 3,
    dietType: 2,
    userId: user4.id
  });
  let infoUser5 = await InfoUser.create({
    weight: 108,
    height: 185,
    gender: 'Male',
    bodyFat: 3,
    goal: 1,
    activityLevel: 1,
    dietType: 1,
    userId: user5.id
  });
};

module.exports = {
  User,
  InfoUser
};
