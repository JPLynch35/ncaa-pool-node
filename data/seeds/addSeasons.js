exports.seed = knex => {
  return knex('seasons').del()
    .then(() => {
      return knex('seasons').insert([
        {id: 1, max_dollars: 100000, start_date: '2020-05-01', end_date: '2021-04-30'},
        {id: 2, max_dollars: 100000, start_date: '2021-05-01', end_date: '2022-04-30'},
        {id: 3, max_dollars: 100000, start_date: '2022-05-01', end_date: '2023-04-30'},
        {id: 4, max_dollars: 100000, start_date: '2023-05-01', end_date: '2024-04-30'},
        {id: 5, max_dollars: 100000, start_date: '2024-05-01', end_date: '2025-04-30'},
      ]);
    });
};
