const SeasonsService = {
  findCurrentYear(knex) {
    return knex('seasons')
      .select('*')
      .where('current', true)
      .first();
  },

  findByYear(knex, year) {
    return knex('seasons')
      .select('*')
      .where('year', year)
      .first();
  },

  listAllYears(knex) {
    return knex('seasons')
      .pluck('year');
  },

  async updateSeason(knex, currentYear, spendingCap, startDate, endDate) {
    return await unsetCurrentSeason(knex)
      .then(async () => {
        return await updateSelectedSeason(knex, currentYear, spendingCap, startDate, endDate)
          .then((season) => {
            return season;
          })
          .catch(err => {
            console.warn('Something went wrong:', err);
          });
    })
    .catch(err => {
      console.warn('Something went wrong:', err);
    });
  },
};

function unsetCurrentSeason(knex) {
  return knex('seasons')
    .where('current', true)
    .update({current: false});
};

function updateSelectedSeason(knex, currentYear, spendingCap, startDate, endDate) {
  return knex('seasons')
    .where('year', currentYear)
    .update({current: true, spending_cap: spendingCap, start_date: startDate, end_date: endDate})
    .returning();
};

module.exports = SeasonsService;
