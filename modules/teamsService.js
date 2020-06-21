const TeamsService = {
  listAll(knex) {
    return knex('teams')
      .select('*');
  },
};

module.exports = TeamsService;
