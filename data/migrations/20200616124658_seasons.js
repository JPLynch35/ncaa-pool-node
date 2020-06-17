exports.up = knex => knex.schema.createTable('seasons', table => {
  table.increments('id').primary();
  table.string('season_year');
  table.integer('spending_cap');
  table.date('start_date');
  table.date('end_date');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('seasons');
