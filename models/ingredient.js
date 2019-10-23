module.exports = (sequelize, type) => {
  return sequelize.define('ingredient', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      allowNull: true
    },
    image: {
      type: type.STRING,
      allowNull: false,
      defaultValue:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5HDIfLK4EKY0Hfm7FT8YHQ99cezfhfAa2UWnfo933n18TNyfGnA'
    },
    cal: {
      type: type.FLOAT,
      allowNull: true
    },
    carbs: {
      type: type.FLOAT,
      allowNull: true
    },
    protein: {
      type: type.FLOAT,
      allowNull: true
    },
    fiber: {
      type: type.FLOAT,
      allowNull: true
    },
    sugar: {
      type: type.FLOAT,
      allowNull: true
    },
    fat: {
      type: type.FLOAT,
      allowNull: true
    },
    description: {
      type: type.STRING(1024),
      allowNull: true,
      defaultValue: 'Update soon...'
    }
  });
};
