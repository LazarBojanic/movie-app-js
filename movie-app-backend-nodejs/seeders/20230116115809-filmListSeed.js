'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('filmList', [
      {
        serviceUserId: 1,
        filmListName: "favorite films",
        averageRating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceUserId: 1,
        filmListName: "funniest films",
        averageRating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceUserId: 1,
        filmListName: "longest films",
        averageRating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceUserId: 1,
        filmListName: "prettiest films",
        averageRating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceUserId: 1,
        filmListName: "oscar best picture winners",
        averageRating: 0,
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
