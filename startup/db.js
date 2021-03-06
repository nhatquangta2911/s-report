const Sequelize = require('sequelize');
const config = require('../config.js');
const { logger } = require('../middlewares/logging');

const UserModel = require('../models/user');
const TokenModel = require('../models/expiredToken');
const InfoUserModel = require('../models/infoUser');
const IngredientModel = require('../models/ingredient');
const TypeQuestionModel = require('../models/typeQuestion');
const QuestionModel = require('../models/question');
const RoleModel = require('../models/role');
const ExpiredTokenModel = require('../models/expiredToken');
const positiveLevelModel = require('../models/positiveLevel');
const answerModel = require('../models/answer');
const postModel = require('../models/post');
const commentModel = require('../models/comment');
const doctorModel = require('../models/doctor');

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

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = UserModel(db, Sequelize);
const Role = RoleModel(db, Sequelize);
const InfoUser = InfoUserModel(db, Sequelize);
const Doctor = doctorModel(db, Sequelize);
const Ingredient = IngredientModel(db, Sequelize);
const TypeQuestion = TypeQuestionModel(db, Sequelize);
const Question = QuestionModel(db, Sequelize);
const UserRole = db.define('user_role', {}, { timestamps: false });
const ExpiredToken = ExpiredTokenModel(db, Sequelize);
const PositiveLevel = positiveLevelModel(db, Sequelize);
const Answer = answerModel(db, Sequelize);
const UserAnswers = db.define('user_answers', {}, { timestamps: false });
const QuestionIngredients = db.define(
  'question_ingredients',
  {},
  { timestamps: false }
);
const AnswerIngredients = db.define(
  'answer_ingredients',
  {},
  { timestamps: false }
);

const Post = postModel(db, Sequelize);
const Comment = commentModel(db, Sequelize);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

User.belongsTo(InfoUser);
InfoUser.hasOne(User);

User.belongsTo(Doctor);
Doctor.hasOne(User);

Question.belongsTo(TypeQuestion);
TypeQuestion.hasOne(Question);

Question.belongsToMany(Ingredient, { through: QuestionIngredients });
Ingredient.belongsToMany(Question, { through: QuestionIngredients });

Question.belongsTo(User);
User.hasMany(Question);

Answer.belongsTo(PositiveLevel);
PositiveLevel.hasOne(Answer);

// Answer.hasMany(Ingredient);
// Ingredient.belongsTo(Answer);
Answer.belongsToMany(Ingredient, { through: AnswerIngredients });
Ingredient.belongsToMany(Answer, { through: AnswerIngredients });

Answer.belongsToMany(User, { through: UserAnswers });
User.belongsToMany(Answer, { through: UserAnswers });

Post.belongsTo(User);
User.hasMany(Post);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

const beDummyData = false;
db.sync({
  force: beDummyData
}).then(() => {
  logger.info('[SYNCED] DATABASE & TABLES CREATED ');
  if (beDummyData) {
    applyDummy();
  }
});

const applyDummy = async () => {
  //TODO: FAKE POSITIVE LEVELS
  let positive = await PositiveLevel.create({
    level: 1,
    name: 'positive'
  });
  let negative = await PositiveLevel.create({
    level: 2,
    name: 'negative'
  });
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
  // let ingredient1 = await Ingredient.create({
  //   name: "Banana",
  //   cal: 110,
  //   carbs: 27,
  //   protein: 1.37,
  //   fiber: 13.1,
  //   sugar: 3.23,
  //   fat: 0.19,
  //   questionId: 2
  // });
  // let ingredient2 = await Ingredient.create({
  //   name: "Apple",
  //   cal: 145,
  //   carbs: 17.6,
  //   protein: 0.97,
  //   fiber: 23.1,
  //   sugar: 5.23,
  //   fat: 0.09,
  //   questionId: 2
  // });
  // let ingredient3 = await Ingredient.create({
  //   name: "Avocado",
  //   cal: 145,
  //   carbs: 17.6,
  //   protein: 0.97,
  //   fiber: 23.1,
  //   sugar: 5.23,
  //   fat: 0.09
  // });
  // let ingredient4 = await Ingredient.create({
  //   name: "Eggs",
  //   cal: 145,
  //   carbs: 17.6,
  //   protein: 0.97,
  //   fiber: 23.1,
  //   sugar: 5.23,
  //   fat: 0.09
  // });
  //TODO: FAKE USER INFO
  // let infoUser1 = await InfoUser.create({
  //   weight: 57,
  //   height: 169,
  //   gender: "Female",
  //   bodyFat: 2,
  //   goal: 2,
  //   activityLevel: 3,
  //   dietType: 1
  // });
  // let infoUser2 = await InfoUser.create({
  //   weight: 88,
  //   height: 175,
  //   gender: "Male",
  //   bodyFat: 3,
  //   goal: 1,
  //   activityLevel: 1,
  //   dietType: 1
  // });
  // let infoUser3 = await InfoUser.create({
  //   weight: 48,
  //   height: 155,
  //   gender: "Male",
  //   bodyFat: 2,
  //   goal: 1,
  //   activityLevel: 3,
  //   dietType: 1
  // });
  // let infoUser4 = await InfoUser.create({
  //   weight: 68,
  //   height: 173,
  //   gender: "Female",
  //   bodyFat: 2,
  //   goal: 2,
  //   activityLevel: 3,
  //   dietType: 2
  // });
  // let infoUser5 = await InfoUser.create({
  //   weight: 108,
  //   height: 185,
  //   gender: "Male",
  //   bodyFat: 3,
  //   goal: 1,
  //   activityLevel: 1,
  //   dietType: 1
  // });
  //TODO: FAKE ANSWERS
  // let answer1 = await Answer.create({
  //   answerContent: "stuff",
  //   positiveLevelId: negative.id
  // });
  // answer1.addIngredients([ingredient1.id, ingredient2.id, ingredient4.id]);
  // let answer2 = await Answer.create({
  //   answerContent: "anything",
  //   positiveLevelId: positive.id
  // });
  // answer2.addIngredients([ingredient2.id]);
  // //TODO: FAKE USERS
  let user1 = await User.create({
    email: 'shawn@enclave.vn',
    phone: '0368080534',
    infoUserId: infoUser1.id,
    doctorId: 2,
    password: '123456'
  });
  await user1.addRoles([role1]);
  await user1.addAnswers([answer2]);
  await user1.addAnswers([answer1]);
  let user2 = await User.create({
    email: 'ben@enclave.vn',
    phone: '0776402587',
    doctorId: 1,
    infoUserId: infoUser2.id,
    password: '123456'
  });
  let user3 = await User.create({
    email: 'lionel@enclave.vn',
    phone: '01234445544',
    infoUserId: infoUser3.id,
    password: '123456'
  });
  let user4 = await User.create({
    email: 'arthur@enclave.vn',
    phone: '01298877772',
    doctorId: 1,
    infoUserId: infoUser4.id,
    password: '123456'
  });
  await user4.addRoles([role1]);
  let user5 = await User.create({
    email: 'kendis@enclave.vn',
    phone: '0904988982',
    infoUserId: infoUser5.id
  });
  //TODO: FAKE POSTS
  let post1 = await Post.create({
    header: 'Bored to death',
    content: 'How to get over all of it',
    userId: user2.id
  });
  let post2 = await Post.create({
    header: 'How to be more proactive',
    content: 'Not brave enough? This post come to rescue',
    userId: user5.id
  });
  //TODO: FAKE COMMENTS
  let comment1 = await Comment.create({
    content: 'Interesting',
    userId: user4.id,
    postId: post1.id
  });
  let comment2 = await Comment.create({
    content: 'Tedious',
    userId: user3.id,
    postId: post2.id
  });
  let comment3 = await Comment.create({
    content: 'Show off!',
    userId: user1.id,
    postId: post2.id
  });
  //TODO: FAKE QUESTIONS
  let question1 = await Question.create({
    typeQuestionId: typeQuestion1.id,
    userId: user1.id,
    amount: 2,
    extraInfo: 'Update soon...'
  });
  await question1.addIngredients([ingredient4]);
  let question2 = await Question.create({
    typeQuestionId: typeQuestion2.id,
    userId: user1.id,
    amount: 2,
    extraInfo: 'Update soon...'
  });
  await question2.addIngredients([ingredient1, ingredient2, ingredient4]);
  let question3 = await Question.create({
    typeQuestionId: typeQuestion3.id,
    userId: user1.id,
    amount: 3,
    extraInfo: 'Update soon...'
  });
  await question3.addIngredients([
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4
  ]);
  let question4 = await Question.create({
    typeQuestionId: typeQuestion4.id,
    userId: user1.id,
    amount: 2,
    extraInfo: 'Update soon...'
  });
  await question4.addIngredients([ingredient3, ingredient2]);
};

module.exports = {
  User,
  InfoUser,
  Ingredient,
  TypeQuestion,
  Question,
  Role,
  Doctor,
  Answer,
  ExpiredToken,
  Post,
  Comment,
  PositiveLevel,
  UserAnswers
};
