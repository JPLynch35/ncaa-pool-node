exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id').primary();
  table.string('email');
  table.string('first_name');
  table.string('last_name');
  table.boolean('is_admin').defaultTo(false);;
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');
