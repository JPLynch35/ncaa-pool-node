exports.up = knex => knex.schema.createTable('teams', table => {
  table.increments('id').primary();
  table.string('name');
  table.string('abbreviation');
  table.integer('espn_id');
  table.integer('value');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('teams');
