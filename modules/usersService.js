const UsersService = {
  findByEmail(knex, userEmail) {
    const downcasedEmail = userEmail.toLowerCase();
    return knex
      .from("users")
      .select("*")
      .where("email", downcasedEmail)
      .first();
  },
  // deleteUser(knex, id) {
  //   const downcasedEmail = userEmail.toLowerCase();
  //   return knex("users")
  //     .where({ id })
  //     .delete();
  // },
  // updateUser(knex, id, userFields) {
  //   return knex("users")
  //     .where({ id })
  //     .update(userFields);
  // },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  findOrCreateUser(knex, userInfo) {
    const downcasedEmail = userInfo.preferred_username.toLowerCase();
    const firstName = userInfo.given_name;
    const lastName = userInfo.family_name;
    return knex.transaction(trx => {
      return trx('users').where('email', downcasedEmail).then(userList => {
        if (userList.length == 0) {
          return trx
            .insert({email: downcasedEmail, first_name: firstName, last_name: lastName})
            .into("users")
            .returning("*")
            .then(userList => {
              return userList[0];
            })
            .catch(err => {
              next(err);
            });
        } else {
          return userList[0];
        };
      })
      .catch(err => {
        return next(err);
      });
    }).then(user => {
      return user
    })
    .catch(err => {
      return next(err);
    });
  },
  // findOrCreateUser(knex, userInfo) {
  //   const downcasedEmail = userInfo.preferred_username.toLowerCase();
  //   const firstName = userInfo.given_name;
  //   const lastName = userInfo.family_name;
  //   knex
  //     .from('users')
  //     .select('*')
  //     .where('email', downcasedEmail)
  //     .then(userList => {
  //       if (userList.length == 0) {
  //         return knex
  //           .insert({email: downcasedEmail, first_name: firstName, last_name: lastName})
  //           .into("users")
  //           .returning("*")
  //           .then(userList => {
  //             return userList[0];
  //           });
  //       } else {
  //         return userList[0];
  //       };
  //     });
  // },
};

module.exports = UsersService;
