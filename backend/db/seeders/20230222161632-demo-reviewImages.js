'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "123wgat1"
      },
      {
        reviewId: 2,
        url: "123wga2"
      },
      {
        reviewId: 3,
        url: "123wgat3"
      },
      {
        reviewId: 4,
        url: "123wgat4"
      },
      {
        reviewId: 5,
        url: "123wgat5"
      },
      {
        reviewId: 6,
        url: "123wgat6"
      },
      {
        reviewId: 7,
        url: "123wga7"
      },
      {
        reviewId: 8,
        url: "123wga8"
      },
      {
        reviewId: 9,
        url: "123wga9"
      },
      {
        reviewId: 10,
        url: "123wgat10"
      },
      {
        reviewId: 11,
        url: "123wgat11"
      },
      {
        reviewId: 12,
        url: "123wgat12"
      },
      {
        reviewId: 13,
        url: "123wgat13"
      },
      {
        reviewId: 14,
        url: "123wgat14"
      },
      {
        reviewId: 15,
        url: "123wgat15"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
