'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('filmInLibrary', [
      {
        filmId: 1,
        serviceUserId: 1,
        liked: 'Yes',
        watched: 'Yes',
        reviewed: 'No',
        review: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 2,
        serviceUserId: 1,
        liked: 'Yes',
        watched: 'No',
        reviewed: 'No',
        review: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 3,
        serviceUserId: 1,
        liked: 'Yes',
        watched: 'Yes',
        reviewed: 'Yes',
        review: 'awesome movie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 4,
        serviceUserId: 1,
        liked: 'Yes',
        watched: 'Yes',
        reviewed: 'Yes',
        review: 'Great movie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 5,
        serviceUserId: 1,
        liked: 'No',
        watched: 'No',
        reviewed: 'No',
        review: null,
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
