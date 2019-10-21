module.exports = (sequelize, type) => {
  return sequelize.define('typeQuestion', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      allowNull: true
    }
  });
};
