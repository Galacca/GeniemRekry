const {TODO_TABLE} = require('./../constants/tables')

exports.seed = function(knex, Promise) {
  console.log("Running todo seed")
        return knex(TODO_TABLE).insert([
        {
          title: 'Buy bread',
        },
        {
          title: 'Pay rent',
        },
        {
          title: 'Take the dog for a walk',
        }
  ]);
}
   
  