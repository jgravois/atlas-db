'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
    */
    await queryInterface.bulkInsert('Journals', [
      {
        memo: 'Hello Cleveland!',
        geom: Sequelize.fn('ST_GeomFromText', 'SRID=4326;POINT(-81.7 41.5)'),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        memo: 'Hello Riverside!',
        geom: Sequelize.fn('ST_GeomFromText', 'SRID=4326;POINT(-117.4 34)'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memo: 'Hello Baltimore!',
        geom: Sequelize.fn('ST_GeomFromText', 'SRID=4326;POINT(-76.6 39.3)'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Journals', null, {});
  }
};
