'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cat_id: {
        type: Sequelize.INTEGER
      },
      articul: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.REAL
      },
      description: {
        type: Sequelize.JSON
      },
      picture: {
        type: Sequelize.STRING
      },
      pictures: {
        type: Sequelize.JSON
      },
      properties: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Catalogs');
  }
};