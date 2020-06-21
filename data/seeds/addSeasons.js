exports.seed = knex => {
  return knex('seasons').del()
    .then(() => {
      return knex('seasons').insert([
        {id: 1, year: 2020, spending_cap: 7500000, start_date: '2020-08-15', end_date: '2021-01-15', current: true},
        {id: 2, year: 2021, spending_cap: 7500000, start_date: '2021-08-15', end_date: '2022-01-15', current: false}
      ]);
    });
};
