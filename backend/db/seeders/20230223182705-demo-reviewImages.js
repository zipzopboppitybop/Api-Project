'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "hello",
      },
      {
        reviewId: 2,
        url: "goodbye",
      },
      {
        reviewId: 3,
        url: "wow",
      },
      {
        reviewId: 4,
        url: "oh",
      },
      {
        reviewId: 5,
        url: "yes",
      },
      {
        reviewId: 6,
        url: "no",
      },
      {
        reviewId: 7,
        url: "lol",
      },
      {
        reviewId: 8,
        url: "what",
      },
      {
        reviewId: 9,
        url: "whatever",
      },
      {
        reviewId: 10,
        url: "loveyou",
      },
      {
        reviewId: 11,
        url: "hateyou",
      },
      {
        reviewId: 12,
        url: "see",
      },
      {
        reviewId: 13,
        url: "blind",
      },
      {
        reviewId: 14,
        url: "black",
      },
      {
        reviewId: 15,
        url: "white",
      },
      {
        reviewId: 16,
        url: "green",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
