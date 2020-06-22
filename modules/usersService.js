const UsersService = {
  // updateUser(knex, id, userFields) {
  //   return knex("users")
  //     .where({ id })
  //     .update(userFields);
  // },

  async findOrCreateUser(knex, userInfo) {
    const downcasedEmail = userInfo.preferred_username.toLowerCase();
    const firstName = userInfo.given_name;
    const lastName = userInfo.family_name;
    return await findByEmail(knex, downcasedEmail)
      .then(async user => {
        if (user) {
          return user;
        } else {
          return await insertUser(knex, downcasedEmail, firstName, lastName)
            .then(user => {
              return user;
            })
            .catch(err => {
              console.warn('Something went wrong:', err);
            });
        };
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
      });
  },
};

function findByEmail(knex, downcasedEmail) {
  return knex('users')
    .select('*')
    .where('email', downcasedEmail)
    .first();
};

function insertUser(knex, downcasedEmail, firstName, lastName) {
  return knex('users')
    .insert({email: downcasedEmail, first_name: firstName, last_name: lastName})
    .returning('*');
};

module.exports = UsersService;
