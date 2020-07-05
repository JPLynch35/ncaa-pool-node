module.exports = (app, knex, oidc, SeasonsService) => {
  app.get('/admin/season_settings', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    Promise.all([
      SeasonsService.findCurrentYear(knex),
      SeasonsService.listAllYears(knex)
    ])
      .then(([season, seasonYears]) => {
        res.render('application.ejs', { page: 'admin/season_settings', user: user, season: season, seasonYears: seasonYears});
        }
      )
      .catch(err => {
        console.warn('Something went wrong:', err);
        res.status(500).send(err);
      });
  });

  app.post('/admin/season_settings', oidc.ensureAuthenticated(), (req, res) => {
    const currentYear = req.body.year;
    const spendingCap = req.body.spendingCap;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    SeasonsService.updateSeason(knex, currentYear, spendingCap, startDate, endDate)
      .then(() => {
        res.redirect('back');
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
        res.status(500).send(err);
      });
  });
};
