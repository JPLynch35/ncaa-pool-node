exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id').primary();
  table.string('email');
  table.boolean('is_admin');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');
