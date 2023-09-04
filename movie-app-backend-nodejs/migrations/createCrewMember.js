'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('crewMember', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: false,
        unique: true,
        primaryKey: true
      },
      artistId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      filmId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      crewMemberRole : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      characterName : {
        type: DataTypes.STRING(500),
        allowNull: true,
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
    await queryInterface.dropTable('crewMember');
  }
};