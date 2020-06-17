exports.up = knex => knex.schema.createTable('seasons', table => {
  table.increments('id').primary();
  table.integer('max_dollars');
  table.date('start_date');
  table.date('end_date');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('seasons');
