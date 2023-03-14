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
        url: "https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://citybizlist.com/media/images/large/1581545816_90.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/ush-universal-studios-hollywood-red-carpet-arch-b.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://ktla.com/wp-content/uploads/sites/4/2022/11/Universial-studios-hollywood.jpg?w=2560&h=1440&crop=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://assets.elpasoco.com/wp-content/uploads/NewsReleasePhotos/NR-2020/Demo-Derby-2017-web-1000x500.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdn.parkrecord.com/wp-content/uploads/sites/11/2019/08/20190803_DemolitionDerby_Samuels_12edited.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cloudfront-us-east-1.images.arcpublishing.com/sltrib/QYHNPMELWJD5LJJWQ3OQPA4ADA.JPG",
        preview: true
      },
      {
        spotId: 4,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Trader_Joes_in_Amherst%2C_NY_-_2018.jpg/1920px-Trader_Joes_in_Amherst%2C_NY_-_2018.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://citybizlist.com/media/images/large/1581545816_90.jpg",
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
