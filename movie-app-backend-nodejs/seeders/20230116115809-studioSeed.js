'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*return queryInterface.bulkInsert('studio', [
      {
        studioName: 'Disney',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        studioName: 'Warner Bros',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        studioName: 'Fox Searchlight',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        studioName: 'Paramount',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        studioName: 'Ghibli',
        createdAt: new Date(),
        updatedAt: new Date()
      },

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
