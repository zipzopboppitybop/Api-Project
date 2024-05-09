'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "Demo",
        lastName: "lition",
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Fake",
        lastName: "User",
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Fake",
        lastName: "User",
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: "Peter",
        lastName: "Parker",
        email: 'Spider@Man.io',
        username: 'Spider-Man',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: "Brian",
        lastName: "Washington",
        email: 'bw49078@gmail.io',
        username: 'bw49078',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: "Michael",
        lastName: "Tuazon",
        email: "Michael@gmail.com",
        username: 'MikeIsTired',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: "Derrick",
        lastName: "Truong",
        email: "Derrick@gmail.com",
        username: 'DerrickIsAlive?',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: "Kisha",
        lastName: "Onia",
        email: "Kisha@gmail.com",
        username: 'KishaDying',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: "Python",
        lastName: "Master",
        email: "Python@isbetter.com",
        username: 'PythonMaster',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: "Java",
        lastName: "Script",
        email: "Javascript@gmail.com",
        username: 'JSIsSuperior',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
