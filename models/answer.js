module.exports = (sequelize, type) => {
  return sequelize.define('answer', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    answerTime: {
      type: type.DATE,
      allowNull: false,
      defaultValue: type.fn('NOW')
    },
    updatedTime: {
      type: type.DATE,
      allowNull: true
    },
    answerContent: {
      type: type.STRING,
      allowNull: false
    }
  });
};
