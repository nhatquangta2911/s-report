module.exports = (sequelize, type) => {
  return sequelize.define("doctor", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: type.STRING,
      allowNull: true
    },
    name: {
      type: type.STRING,
      allowNull: true
    }
  });
};
