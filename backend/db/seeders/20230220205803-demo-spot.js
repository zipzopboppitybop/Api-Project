'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "234 Universal Drive",
        city: "Los Angels",
        state: "California",
        country: "United States of America",
        lat: 40.7645358,
        lng: -100.4730327,
        name: "Universal Studios",
        description: "Place where dreams die",
        price: 1233
      },
      {
        ownerId: 3,
        address: "345 Looney Lane",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 37.7643243,
        lng: -222.4730327,
        name: "Bruh Studios",
        description: "Place where I Live",
        price: 3455
      },
      {
        ownerId: 1,
        address: "345 Looney Lane",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 37.7643243,
        lng: -222.4730327,
        name: "Bruh Studios",
        description: "Place where I Live",
        price: 3455
      },
      {
        ownerId: 1,
        address: "345 Looney Lane",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 37.7643243,
        lng: -222.4730327,
        name: "Bruh Studios",
        description: "Place where I Live",
        price: 3455
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
