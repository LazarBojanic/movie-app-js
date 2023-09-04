'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('artist', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
        unique: true,
        primaryKey: true
      },
      artistName : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      birthday : {
        type: DataTypes.DATEONLY,
        allowNull: true,
        unique: false
      },
      deathday : {
        type: DataTypes.DATEONLY,
        allowNull: true,
        unique: false
      },
      placeOfBirth : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
      },
      biography : {
        type: DataTypes.STRING(5000),
        allowNull: true,
        unique: false
      },
      imageUrl : {
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
    await queryInterface.dropTable('artist');
  }
};