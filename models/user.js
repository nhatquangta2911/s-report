module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: type.STRING,
      allowNull: true
    },
    password: {
      type: type.STRING,
      allowNull: true
    },
    status: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
    // info: {
    //   type: type.INTEGER,
    //   references: {
    //     model: 'infoUser',
    //     key: 'id'
    //   }
    // }
  });
};
