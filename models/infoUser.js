module.exports = (sequelize, type) => {
  return sequelize.define('infoUser', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    weight: {
      type: type.INTEGER,
      allowNull: true
    },
    height: {
      type: type.INTEGER,
      allowNull: true
    },
    gender: {
      type: type.ENUM('Male', 'Female'),
      allowNull: true
    },
    bodyFat: {
      type: type.INTEGER,
      allowNull: true
    },
    goal: {
      type: type.INTEGER,
      allowNull: true
    },
    activityLevel: {
      type: type.INTEGER,
      allowNull: true
    },
    dietType: {
      type: type.INTEGER,
      allowNull: true
    }
  });
};
