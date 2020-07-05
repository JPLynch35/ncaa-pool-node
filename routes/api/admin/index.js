// TODO remove api and place inside regular admin router
module.exports = (app, knex, oidc, SeasonsService) => {
  app.get('/api/admin/current_season', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    const year = req.query.seasonYear;
    SeasonsService.findByYear(knex, year)
      .then(currentSeason => {
        res.status(200).send(currentSeason);
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
        res.status(500).send(err);
    });
  });
};
