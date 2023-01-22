'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('filmInList', [
      {
        filmId: 1,
        filmListId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 2,
        filmListId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 3,
        filmListId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 4,
        filmListId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 5,
        filmListId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },

  ]);
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
