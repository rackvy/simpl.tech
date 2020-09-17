'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shop.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    vk: DataTypes.STRING,
    fb: DataTypes.STRING,
    wa: DataTypes.STRING,
    telegram: DataTypes.STRING,
    instagram: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    params_del_pay: DataTypes.JSON,
    adresses: DataTypes.JSON,
    texts: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Shop',
  });
  Shop.associate = function(models) {
    // associations can be defined here
    Shop.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };
  return Shop;
};