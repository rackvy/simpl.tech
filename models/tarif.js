'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tarif.init({
    summ: DataTypes.INTEGER,
    name: DataTypes.STRING,
    payday: DataTypes.INTEGER,
    items: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tarif',
  });
  Tarif.associate = function(models) {
    // associations can be defined here
    Tarif.hasMany(models.User, {
      foreignKey: 'tarif_id',
      onDelete: 'CASCADE'
    })
  };
  return Tarif;
};