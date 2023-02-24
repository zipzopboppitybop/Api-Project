'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("2022-11-17"),
        endDate: new Date("2022-12-12"),
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date("2022-10-14"),
        endDate: new Date("2022-10-16"),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date("2022-12-01"),
        endDate: new Date("2023-01-01"),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
