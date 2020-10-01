'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Catalog.init({
    active: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    cat_id: DataTypes.INTEGER,
    articul: DataTypes.STRING,
    price: DataTypes.REAL,
    description: DataTypes.JSON,
    picture: DataTypes.STRING,
    pictures: DataTypes.JSON,
    properties: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Catalog',
  });
  return Catalog;
};