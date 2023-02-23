'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "hello",
        preview: true
      },
      {
        spotId: 1,
        url: "goodbye",
        preview: true
      },
      {
        spotId: 2,
        url: "no",
        preview: true
      },
      {
        spotId: 2,
        url: "yes",
        preview: false
      },
      {
        spotId: 3,
        url: "what",
        preview: false
      },
      {
        spotId: 3,
        url: "whatever",
        preview: true
      },
      {
        spotId: 4,
        url: "loveyou",
        preview: true
      },
      {
        spotId: 4,
        url: "hateyou",
        preview: true
      },
      {
        spotId: 5,
        url: "bruh",
        preview: true
      },
      {
        spotId: 5,
        url: "lol",
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
