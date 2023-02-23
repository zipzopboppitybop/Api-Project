'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "bad",
        stars: 1
      },
      {
        spotId: 1,
        userId: 2,
        review: "ok",
        stars: 2
      },
      {
        spotId: 1,
        userId: 2,
        review: "bad",
        stars: 1
      },
      {
        spotId: 1,
        userId: 3,
        review: "bad",
        stars: 1
      },
      {
        spotId: 2,
        userId: 1,
        review: "ok",
        stars: 2
      },
      {
        spotId: 2,
        userId: 2,
        review: "ok",
        stars: 2
      },
      {
        spotId: 2,
        userId: 3,
        review: "ok",
        stars: 2
      },
      {
        spotId: 3,
        userId: 1,
        review: "good",
        stars: 3
      },
      {
        spotId: 3,
        userId: 2,
        review: "good",
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: "good",
        stars: 3
      },
      {
        spotId: 4,
        userId: 1,
        review: "great",
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: "great",
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: "great",
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: "perfect",
        stars: 5
      },
      {
        spotId: 5,
        userId: 2,
        review: "perfect",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "perfect",
        stars: 5
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
