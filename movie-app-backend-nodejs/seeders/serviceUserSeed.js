'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPass1 = bcrypt.hashSync('admin', 10);
    const hashedPass2 = bcrypt.hashSync('moderator', 10);
    const hashedPass3 = bcrypt.hashSync('lazar', 10);
    const hashedPass4 = bcrypt.hashSync('test1', 10);
    const hashedPass5 = bcrypt.hashSync('test2', 10);
    return queryInterface.bulkInsert('serviceUser', [
      {
        username: 'admin',
        email: 'admin',
        pass: hashedPass1,
        userRole: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'moderator',
        email: 'moderator',
        pass: hashedPass2,
        userRole: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'lazar',
        email: 'lazar',
        pass: hashedPass3,
        userRole: 'lazar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'test1',
        email: 'test1',
        pass: hashedPass4,
        userRole: 'test1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'test2',
        email: 'test2',
        pass: hashedPass5,
        userRole: 'test2',
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
