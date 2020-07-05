const UsersService = {
  async findOrCreateUser(knex, userInfo) {
    const downcasedEmail = userInfo.preferred_username.toLowerCase();
    const firstName = userInfo.given_name;
    const lastName = userInfo.family_name;
    var user = await findByEmail(knex, downcasedEmail);
    if (!user) {
      await insertUser(knex, downcasedEmail, firstName, lastName);
      user = await findByEmail(knex, downcasedEmail);
    };
    return user;
  },
};

function findByEmail(knex, downcasedEmail) {
  return knex('users')
    .select('*')
    .where('email', downcasedEmail)
    .first()
    .then(user => {
      return user
    })
    .catch(err => {
      console.warn('Something went wrong:', err);
    });
};

function insertUser(knex, downcasedEmail, firstName, lastName) {
  return knex('users')
    .insert({email: downcasedEmail, first_name: firstName, last_name: lastName})
    .then()
    .catch(err => {
      console.warn('Something went wrong:', err);
    });
};

module.exports = UsersService;
