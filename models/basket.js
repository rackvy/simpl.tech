'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Basket.init({
    ssid: DataTypes.STRING,
    shop_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    properties: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Basket',
  });
  Basket.associate = function(models) {
    // associations can be defined here
    Basket.belongsTo(models.Shop, {
      foreignKey: 'shop_id',
      onDelete: 'CASCADE'
    });
    Basket.belongsTo(models.Catalog, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE'
    });
  };
  return Basket;
};