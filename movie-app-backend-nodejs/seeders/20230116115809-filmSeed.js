'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*return queryInterface.bulkInsert('film', [
      {
        title : 'Once',
        pegi : '13',
        rating  : 7.8,
        synopsis  : '2 Musicians in Ireland meet',
        releaseYear  : 2007,
        imageUrl  : null,
        studioId  : 3,
        genreId  : 4,
        countryId   : 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : 'Frances Ha',
        pegi : '13',
        rating  : 8.7,
        synopsis  : 'A dancer by the name of frances lives life in New York',
        releaseYear  : 2012,
        imageUrl  : null,
        studioId  : 3,
        genreId  : 1,
        countryId   : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : 'Spirited Away',
        pegi : '13',
        rating  : 9.5,
        synopsis  : 'Chihiro stumbles upon a ghost town',
        releaseYear  : 2001,
        imageUrl  : null,
        studioId  : 5,
        genreId  : 1,
        countryId   : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : 'Ratatouille',
        pegi : '13',
        rating  : 8.7,
        synopsis  : 'A rat and a man meet and cook together',
        releaseYear  : 2007,
        imageUrl  : null,
        studioId  : 1,
        genreId  : 1,
        countryId   : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : 'Blade Runner 2049',
        pegi : '18',
        rating  : 9.0,
        synopsis  : 'Officer K investigates a mystery from the past',
        releaseYear  : 2017,
        imageUrl  : null,
        studioId  : 2,
        genreId  : 1,
        countryId   : 1,
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
