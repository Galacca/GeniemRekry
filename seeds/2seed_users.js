const {USER_TABLE} = require('./../constants/tables')
const bcrypt = require('bcryptjs')
const { crypto } = require('../constants');

exports.seed = function(knex, Promise) {
  console.log("Running users seed")
  const generateHash = bcrypt.hashSync('123', crypto.SALT_ROUNDS)
        return knex(USER_TABLE).insert([
        {
          username: "pentti",
          name: "Pentti",
          lastName: "Placeholder",
          passwordHash: generateHash
        },
        {
          username: "milla",
          name: "Milla",
          lastName: "Mallikas",
          passwordHash: generateHash
        },
        {
          username: "kaija",
          name: "Kaija",
          lastName: "Koodari",
          passwordHash: generateHash
        }
  ]);
};
 