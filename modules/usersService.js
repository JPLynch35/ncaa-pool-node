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
};

module.exports = UsersService;
