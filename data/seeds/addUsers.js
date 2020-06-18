exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {id: 1, email: 'jplynch35@gmail.com', first_name: 'JP', last_name: 'Lynch', is_admin: true},
        {id: 2, email: 'jplynch37@gmail.com', first_name: 'JP', last_name: 'Lynch', },
        {id: 3, email: 'jaschuler@gmail.com', first_name: 'Joe', last_name: 'Schuler', is_admin: true}
      ]);
    });
};
