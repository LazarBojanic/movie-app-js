'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('film', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      title : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      pegi : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      rating : {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false
      },
      synopsis : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      studioId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      genreId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      countryId : {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('film');
  }
};