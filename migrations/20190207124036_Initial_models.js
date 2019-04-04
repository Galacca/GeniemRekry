const { tables } = require('../constants');

exports.up = knex => {
  return knex.schema
    .createTable(tables.TODO_TABLE, table => {
      table.increments('id').primary();
      table.string('title').notNullable();

      table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
      table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());
    })
    .createTable(tables.USER_TABLE, table => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('name');
      table.string('lastName');
      table.string('passwordHash')

      table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
      table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());

    })
    .createTable(tables.TODO_LIST_TABLE, table => {
      table.increments('id').primary();
      table.string('title');

      table
      .integer('ownerId')
      .unsigned()
      .references('id')
      .inTable(tables.USER_TABLE)
      .onDelete('SET NULL')
      .index();

      table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
      table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists(tables.USER_TABLE)
    .dropTableIfExists(tables.TODO_TABLE)
    .dropTableIfExists(tables.TODO_LIST_TABLE);
};
