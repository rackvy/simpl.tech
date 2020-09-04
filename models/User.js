'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user'),
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    last_login: DataTypes.DATE,
    tarif_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Shop, {
      foreignKey: 'user_id',
    })
  };
  return User;
};