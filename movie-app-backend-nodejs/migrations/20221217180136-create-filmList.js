'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('filmList', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      serviceUserId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      filmListName : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      averageRating : {
        type: DataTypes.FLOAT,
        allowNull: true,
        unique: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('filmList');
  }
};