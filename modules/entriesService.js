const EntriesService = {
  async updateEntries(knex, user, entryTeamIds) {
    if (await userTeamsValid(knex, entryTeamIds)) {
      await deleteUserTeams(knex, user);
      await insertUserTeams(knex, user, entryTeamIds);
    };
  },

  async listEntryTeamIds(knex, user) {
    return await listUserTeamIds(knex, user);
  },
};

async function userTeamsValid(knex, entryTeamIds) {
  const entryTeamIdsSet = new Set(entryTeamIds); // set removes any duplicates
  const areEntryTeamIdsUnique = (entryTeamIds.length == entryTeamIdsSet.size)

  const areEntryTeamIdsValidTeams = await validateTeamIds(knex, entryTeamIds);

  const areEntryValuesBelowSeasonCap = await validateEntryValues(knex, entryTeamIds);

  return (areEntryTeamIdsUnique && areEntryTeamIdsValidTeams && areEntryValuesBelowSeasonCap);
};

async function validateTeamIds(knex, entryTeamIds) {
  return Promise.all(
    entryTeamIds.map(entryTeamId => {
      return knex('user_teams')
        .where('team_id', entryTeamId)
        .then(() => {
          return true;
        })
        .catch(err => {
          return false;
        });
    })
  ).then(validationArray => {
    return !validationArray.includes(false);
  });
};

async function validateEntryValues(knex, entryTeamIds) {
  return Promise.all([
    knex('seasons')
      .select('*')
      .where('current', true)
      .first()
      .then(currentSeason => {
        return currentSeason.spending_cap
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
      }),
    Promise.all(
      entryTeamIds.map(entryTeamId => {
        return knex('teams')
          .where('id', entryTeamId)
          .then(([team])=> {
            return team.value;
          })
          .catch(err => {
            console.warn('Something went wrong:', err);
          });
      })
    )
  ])
    .then(([seasonSpendingCap, entryTeamValues]) => {
      const entryTeamTotal = entryTeamValues.reduce(
        (a, b) => a + b,
        0
      );
      return seasonSpendingCap >= entryTeamTotal
    })
};

function deleteUserTeams(knex ,user) {
  return knex('user_teams')
    .where('user_id', user.id)
    .del()
    .then()
    .catch(err => {
      console.warn('Something went wrong:', err);
      res.status(500).send(err);
    });
};

function insertUserTeams(knex, user, entryTeamIds) {
  entryTeamIds.forEach(function(entryTeamId) {
    return knex('user_teams')
    .insert({user_id: user.id, team_id: entryTeamId})
    .then()
    .catch(err => {
      console.warn('Something went wrong:', err);
    });
  });
};

function listUserTeamIds(knex, user) {
  return knex('user_teams')
    .select('team_id')
    .where('user_id', user.id)
    .pluck('team_id')
    .then(teamIds => {
      return teamIds;
    })
    .catch(err => {
      console.warn('Something went wrong:', err);
    });
};

module.exports = EntriesService;
