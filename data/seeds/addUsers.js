exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {id: 1, email: 'jplynch35@gmail.com', is_admin: true},
        {id: 2, email: 'jplynch37@gmail.com'},
        {id: 3, email: 'jaschuler@gmail.com', is_admin: true}
      ]);
    });
};
