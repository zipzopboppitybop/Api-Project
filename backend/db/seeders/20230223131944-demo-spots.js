'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
        price: 123,
      },
      {
        ownerId: 1,
        address: "234 Universal Drive",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 40.2837433,
        lng: -20.4859302,
        name: "Universal Studios",
        description: "Place where dreams die",
        price: 123.23,
      },
      {
        ownerId: 1,
        address: "345 Demolition Derby",
        city: "Waller",
        state: "Texas",
        country: "United States of America",
        lat: 20.7645358,
        lng: -90.4730327,
        name: "Demolition Derby",
        description: "Place where stuff is destroyed",
        price: 1233,
      },
      {
        ownerId: 2,
        address: "2001 Greenville Ave",
        city: "Dallas",
        state: "Texas",
        country: "United States of America",
        lat: 32.8148438,
        lng: -96.8159061,
        name: "Trader Joes",
        description: "Place where dreams come true",
        price: 12233,
      },
      {
        ownerId: 3,
        address: "456 Bruh Street",
        city: "Bruhcity",
        state: "Bruhmium",
        country: "United States of Bruh",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Bruh",
        description: "Bruh what",
        price: 1232222,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
