'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*return queryInterface.bulkInsert('genre', [
      {
        genreName: 'drama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        genreName: 'action',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        genreName: 'comedy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        genreName: 'musical',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        genreName: 'documentary',
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
