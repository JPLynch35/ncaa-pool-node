exports.up = knex => knex.schema.createTable('user_teams', table => {
  table.increments('id').primary();
  table.integer('team_id').references('id').inTable('teams');
  table.integer('user_id').references('id').inTable('users');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('user_teams');
