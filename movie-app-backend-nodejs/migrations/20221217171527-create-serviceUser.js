'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('serviceUser', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      username : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      pass : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      userRole : {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('serviceUser');
  }
};