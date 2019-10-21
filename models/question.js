module.exports = (sequelize, type) => {
  return sequelize.define('question', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: type.INTEGER,
      defaultValue: 1
    },
    consumedTime: {
      type: type.DATE,
      allowNull: false,
      defaultValue: type.fn('NOW')
    },
    extraInfo: {
      type: type.STRING,
      allowNull: true
    }
  });
};
