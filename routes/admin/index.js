module.exports = (app, knex, oidc, SeasonsService) => {
  app.get('/admin/seasons', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    redirectUnlessAdmin(res, user);
    Promise.all([
      SeasonsService.findCurrentYear(knex),
      SeasonsService.listAllYears(knex)
    ])
      .then(([season,seasonYears]) => {
        res.render('pages/application.ejs', { page: 'admin/seasons', user: user, season: season, seasonYears: seasonYears});
        }
      )
      .catch(err => {
        console.warn('Something went wrong:', err);
        res.status(500).send(err);
      });
  });

  app.post('/admin/seasons', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    redirectUnlessAdmin(res, user);
    currentYear = req.body.year;
    spendingCap = req.body.spendingCap;
    startDate = req.body.startDate;
    endDate = req.body.endDate;
    SeasonsService.updateSeason(knex, currentYear, spendingCap, startDate, endDate)
      .then((season) => {
        res.redirect('back');
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
        res.status(500).send(err);
      });
  });

  redirectUnlessAdmin = (res, user) => {
    if (!user.is_admin) res.redirect('/home');
  };
};
