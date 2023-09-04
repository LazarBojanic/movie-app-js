'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('countryOfFilm', {
      countryId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      filmId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('countryOfFilm');
  }
};