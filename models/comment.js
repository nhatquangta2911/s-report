module.exports = (sequelize, type) => {
  return sequelize.define('comment', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    commentTime: {
      type: type.DATE,
      allowNull: false,
      defaultValue: type.fn('NOW')
    },
    content: {
      type: type.STRING,
      allowNull: false
    }
  });
};
