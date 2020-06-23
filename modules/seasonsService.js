const SeasonsService = {
  findCurrentYear(knex) {
    return knex('seasons')
      .select('*')
      .where('current', true)
      .first()
      .then(currentYear => {
        return currentYear
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
      });
  },

  findByYear(knex, year) {
    return knex('seasons')
      .select('*')
      .where('year', year)
      .first()
      .then(season => {
        return season
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
      });
  },

  listAllYears(knex) {
    return knex('seasons')
      .pluck('year')
      .then(allYears => {
        return allYears
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
      });
  },

  async updateSeason(knex, currentYear, spendingCap, startDate, endDate) {
    await unsetCurrentSeason(knex);
    await updateSelectedSeason(knex, currentYear, spendingCap, startDate, endDate);
    const season = SeasonsService.findByYear(knex, currentYear);
    return season;
  },
};

function unsetCurrentSeason(knex) {
  return knex('seasons')
    .where('current', true)
    .update({current: false})
    .then()
    .catch(err => {
      console.warn('Something went wrong:', err);
    });
};

function updateSelectedSeason(knex, currentYear, spendingCap, startDate, endDate) {
  return knex('seasons')
    .where('year', currentYear)
    .update({current: true, spending_cap: spendingCap, start_date: startDate, end_date: endDate})
    .then()
    .catch(err => {
      console.warn('Something went wrong:', err);
    });
};

module.exports = SeasonsService;
