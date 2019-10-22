module.exports = (sequelize, type) => {
  return sequelize.define('post', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdTime: {
      type: type.DATE,
      allowNull: false,
      defaultValue: type.fn('NOW')
    },
    updatedTime: {
      type: type.DATE,
      allowNull: true
    },
    header: {
      type: type.STRING(255),
      allowNull: false
    },
    content: {
      type: type.TEXT,
      allowNull: false
    },
    photo: {
      type: type.TEXT,
      allowNull: false,
      defaultValue:
        'https://www.sportanddev.org/sites/default/files/styles/borealis_spor_16_9_cropped_default_style_respondmedium/public/default_images/default-organization-cover_1.png?itok=Xcc_WIdO'
    }
  });
};
