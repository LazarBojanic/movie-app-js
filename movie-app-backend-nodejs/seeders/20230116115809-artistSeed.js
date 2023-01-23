'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*return queryInterface.bulkInsert('artist', [
      {
        firstName: 'Ryan',
        lastName: 'Gosling',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Emma',
        lastName: 'Stone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Denis',
        lastName: 'Villenueve',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Richard',
        lastName: 'Linklater',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Greta',
        lastName: 'Gerwig',
        createdAt: new Date(),
        updatedAt: new Date()
      }

  ]);*/
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
