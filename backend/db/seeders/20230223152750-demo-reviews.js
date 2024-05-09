'use strict';
/** @type {import('sequelize-cli').Migration} */
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
        userId: 7,
        review: "Great place! Kids and all age groups enjoyed the stay and had ton of fun.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: "It was alright. Been to better spots for lower prices",
        stars: 2
      },
      {
        spotId: 1,
        userId: 6,
        review: "It was pretty good for the price.",
        stars: 3
      },
      {
        spotId: 1,
        userId: 8,
        review: "I think anyone would enjoy a place like this.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: "Absolutely adore this place. Kids and I are coming back next year!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: "Perfect place for the entire family!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 7,
        review: "I wish it was App Academy. Heard that place is better.",
        stars: 1
      },
      {
        spotId: 2,
        userId: 2,
        review: "It's fine I guess. Could've been worse",
        stars: 2
      },
      {
        spotId: 3,
        userId: 10,
        review: "I saw a wheel hit a pole and destroy it.",
        stars: 3
      },
      {
        spotId: 3,
        userId: 2,
        review: "The wheel on my car fell off",
        stars: 5
      },
      {
        spotId: 3,
        userId: 6,
        review: "I wheel hit a pole and it landed on my car in the parking lot.",
        stars: 1
      },
      {
        spotId: 3,
        userId: 9,
        review: "My car got destroyed",
        stars: 1
      },
      {
        spotId: 3,
        userId: 8,
        review: "I wish there were more chevys getting destroyed.",
        stars: 2
      },
      {
        spotId: 4,
        userId: 5,
        review: "There was someone in the house with me when I wanted to be alone.",
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        review: "I found a great hiding spot.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: "I swear I was hearing someone giggling in the walls but other than that it was pretty ok.",
        stars: 3
      },
      {
        spotId: 5,
        userId: 2,
        review: "This is God's gift to the world.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "I wish I could live here forever.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 7,
        review: "There is no downside to this place I love it.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 10,
        review: "I love tiny houses lol.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 9,
        review: "How could anyone live like this!?",
        stars: 1
      },
      {
        spotId: 6,
        userId: 6,
        review: "I hated every second of this place.",
        stars: 1
      },
      {
        spotId: 7,
        userId: 10,
        review: "The tiny houses of Texas are amazing!",
        stars: 5
      },
      {
        spotId: 7,
        userId: 9,
        review: "Why do I keep making these mistakes?",
        stars: 1
      },
      {
        spotId: 7,
        userId: 6,
        review: "This is how they tortured criminals I'm sure of it",
        stars: 1
      },
      {
        spotId: 8,
        userId: 1,
        review: "It was really quiet loved it",
        stars: 5
      },
      {
        spotId: 8,
        userId: 3,
        review: "It's really scary being away from civilization but other than that was pretty good.",
        stars: 4
      },
      {
        spotId: 8,
        userId: 4,
        review: "I hate the outdoors. But it was okay.",
        stars: 2
      },
      {
        spotId: 9,
        userId: 2,
        review: "I felt like a princess here!",
        stars: 5
      },
      {
        spotId: 9,
        userId: 5,
        review: "Way too much space and way too overpriced!",
        stars: 1
      },
      {
        spotId: 9,
        userId: 7,
        review: "I think I became Jay Gatsby for a little bit",
        stars: 5
      },
      {
        spotId: 10,
        userId: 9,
        review: "Now this is a castle! Who knew Texas had castles!",
        stars: 5
      },
      {
        spotId: 10,
        userId: 8,
        review: "I've stayed in cooler castles but this is pretty good.",
        stars: 4
      },
      {
        spotId: 20,
        userId: 9,
        review: "I've stayed in castles before and this is reminds me of one.",
        stars: 5
      },
      {
        spotId: 20,
        userId: 2,
        review: "I love the size of this place. The size and amenities really make the price seem like nothing. Family had a greate time.",
        stars: 5
      }










    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
