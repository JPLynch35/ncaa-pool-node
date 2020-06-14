const fs = require('fs');

let rawTeamData = () => {
  const data = fs.readFileSync('data/seed_csvs/teams.csv', 'utf8');
  let dataArray = data.split(/\r?\n/);
  dataArray.shift();
  return dataArray;
};

let createTeam = (knex, id, team) => {
  return knex('teams').insert({
    id,
    espn_id: parseInt(team[0]),
    name: team[1],
    abbreviation: team[2],
    value: 0
  })
  .catch(error => console.log(`Error seeding team data: ${error}`))
};

exports.seed = knex => {
  return knex.raw('TRUNCATE teams RESTART IDENTITY CASCADE')
  .then(() => knex('teams').del())
  .then(() => {
    let completeTeams = [];
    let i = 1;
    rawTeamData().forEach((team) => {
      var team = team.split(',');
      completeTeams.push(createTeam(knex, i, team));
      i++;
    });
    return Promise.all(completeTeams)
    .then(() => console.log('Seeding teams complete!'))
  })
  .catch(error => console.log(`Error seeding teams data: ${error}`));
};
