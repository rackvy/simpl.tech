'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    shop_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    pay: DataTypes.STRING,
    delivery: DataTypes.STRING,
    adress: DataTypes.TEXT,
    comment: DataTypes.TEXT,
    items: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Order',
  });
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Shop, {
      foreignKey: 'shop_id',
      onDelete: 'CASCADE'
    });
  };

  return Order;
};