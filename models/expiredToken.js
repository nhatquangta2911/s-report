module.exports = (sequelize, type) => {
  return sequelize.define('expiredToken', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: type.TEXT
  });
};
