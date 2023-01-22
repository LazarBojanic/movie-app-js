'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('filmInLibrary', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      filmId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      serviceUserId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      liked : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      watched : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      reviewed : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      review : {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('filmInLibrary');
  }
};