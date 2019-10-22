module.exports = (sequelize, type) => {
  return sequelize.define('positiveLevel', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    level: {
      type: type.TINYINT(10),
      allowNull: false
    },
    name: {
      type: type.STRING,
      allowNull: false
    }
  });
};
