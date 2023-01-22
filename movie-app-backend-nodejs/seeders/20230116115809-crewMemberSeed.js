'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('crewMember', [
      {
        artistId: 1,
        filmId: 5,
        crewMemberRole: 'actor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 2,
        filmId: 4,
        crewMemberRole: 'actor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 3,
        filmId: 3,
        crewMemberRole: 'director',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 4,
        filmId: 2,
        crewMemberRole: 'director',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 5,
        filmId: 1,
        crewMemberRole: 'actor',
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
