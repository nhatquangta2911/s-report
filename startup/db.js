const Sequelize = require('sequelize');
const config = require('../config.js');
const { logger } = require('../middlewares/logging');

const UserModel = require('../models/user');
const InfoUserModel = require('../models/infoUser');
const IngredientModel = require('../models/ingredient');
const TypeQuestionModel = require('../models/typeQuestion');
const QuestionModel = require('../models/question');
const RoleModel = require('../models/role');

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
const Role = RoleModel(db, Sequelize);
const InfoUser = InfoUserModel(db, Sequelize);
const Ingredient = IngredientModel(db, Sequelize);
const TypeQuestion = TypeQuestionModel(db, Sequelize);
const Question = QuestionModel(db, Sequelize);
const UserRole = db.define('user_role', {}, { timestamps: false });

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

User.belongsTo(InfoUser);
InfoUser.hasOne(User);

Question.belongsTo(TypeQuestion);
TypeQuestion.hasOne(Question);

Question.belongsTo(Ingredient);
Ingredient.hasOne(Question);

Question.belongsTo(User);
User.hasOne(Question);

const applyDummy = async () => {
  //TODO: FAKE ROLES
  let role1 = await Role.create({
    name: 'admin'
  });
  let role2 = await Role.create({
    name: 'user'
  });
  // TODO: FAKE TYPE QUESTIONS
  let typeQuestion1 = await TypeQuestion.create({
    name: 'Yes/No'
  });
  let typeQuestion2 = await TypeQuestion.create({
    name: 'Single-choice'
  });
  let typeQuestion3 = await TypeQuestion.create({
    name: 'Multi-choice'
  });
  let typeQuestion4 = await TypeQuestion.create({
    name: 'Dropdown List'
  });
  let typeQuestion5 = await TypeQuestion.create({
    name: 'Text'
  });
  //TODO: FAKE INGREDIENTS
  let ingredient1 = await Ingredient.create({
    name: 'Banana',
    cal: 110,
    carbs: 27,
    protein: 1.37,
    fiber: 13.1,
    sugar: 3.23,
    fat: 0.19
  });
  let ingredient2 = await Ingredient.create({
    name: 'Apple',
    cal: 145,
    carbs: 17.6,
    protein: 0.97,
    fiber: 23.1,
    sugar: 5.23,
    fat: 0.09
  });
  //TODO: FAKE USER INFO
  let infoUser1 = await InfoUser.create({
    weight: 57,
    height: 169,
    gender: 'Female',
    bodyFat: 2,
    goal: 2,
    activityLevel: 3,
    dietType: 1
  });
  let infoUser2 = await InfoUser.create({
    weight: 88,
    height: 175,
    gender: 'Male',
    bodyFat: 3,
    goal: 1,
    activityLevel: 1,
    dietType: 1
  });
  let infoUser3 = await InfoUser.create({
    weight: 48,
    height: 155,
    gender: 'Male',
    bodyFat: 2,
    goal: 1,
    activityLevel: 3,
    dietType: 1
  });
  let infoUser4 = await InfoUser.create({
    weight: 68,
    height: 173,
    gender: 'Female',
    bodyFat: 2,
    goal: 2,
    activityLevel: 3,
    dietType: 2
  });
  let infoUser5 = await InfoUser.create({
    weight: 108,
    height: 185,
    gender: 'Male',
    bodyFat: 3,
    goal: 1,
    activityLevel: 1,
    dietType: 1
  });
  //TODO: FAKE USERS
  let user1 = await User.create({
    email: 'shawn@enclave.vn',
    phone: '0368080534',
    infoUserId: infoUser1.id
  });
  await user1.addRoles([role1]);
  let user2 = await User.create({
    email: 'ben@enclave.vn',
    phone: '0776402587',
    infoUserId: infoUser2.id
  });
  let user3 = await User.create({
    email: 'lionel@enclave.vn',
    phone: '01234445544',
    infoUserId: infoUser3.id
  });
  let user4 = await User.create({
    email: 'arthur@enclave.vn',
    phone: '01298877772',
    infoUserId: infoUser4.id
  });
  await user4.addRoles([role1]);
  let user5 = await User.create({
    email: 'kendis@enclave.vn',
    phone: '0904988982',
    infoUserId: infoUser5.id
  });

  let question1 = await Question.create({
    typeQuestionId: typeQuestion1.id,
    ingredientId: ingredient1.id,
    userId: user1.id,
    amount: 2,
    extraInfo: 'Update soon...'
  });
  let question2 = await Question.create({
    typeQuestionId: typeQuestion2.id,
    ingredientId: ingredient2.id,
    userId: user2.id,
    amount: 1,
    extraInfo: 'Update soon...'
  });
};

module.exports = {
  User,
  InfoUser,
  Ingredient,
  TypeQuestion,
  Question,
  Role
};
