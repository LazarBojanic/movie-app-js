'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('country', [
      {
        countryName: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countryName: 'Japan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countryName: 'France',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countryName: 'Italy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countryName: 'Ireland',
        createdAt: new Date(),
        updatedAt: new Date()
      }

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
