module.exports = (app, knex, oidc, EntriesService, SeasonsService, TeamsService, UsersService) => {
  app.get('/local-logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/', oidc.ensureAuthenticated(), (req, res) => {
    res.redirect('/home');
  });

  app.get('/home', oidc.ensureAuthenticated(), (req, res) => {
    res.render('application.ejs', { page: 'home', user: req.session.user });
  });

  app.get('/entries', oidc.ensureAuthenticated(), (req, res) => {
    res.render('application.ejs', { page: 'entries', user: req.session.user });
  });

  app.get('/results', oidc.ensureAuthenticated(), (req, res) => {
    res.render('application.ejs', { page: 'results', user: req.session.user });
  });

  app.get('/selections', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    Promise.all([
      SeasonsService.findCurrentYear(knex),
      TeamsService.listAll(knex),
      EntriesService.listEntryTeamIds(knex, user)
    ])
      .then(([season, allTeams, entryTeamIds]) => {
        res.render('application.ejs', {page: 'selections', user: user, entryTeamIds: entryTeamIds, teams: allTeams, season: season});
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
        res.status(500).send(err);
      });
  });

  app.post('/selections', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    const entryTeamIds = req.body.entryTeamIds;
    EntriesService.updateEntries(knex, user, entryTeamIds)
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
        res.status(500).send(err);
      });
  });

  app.get('/rules', oidc.ensureAuthenticated(), (req, res) => {
    res.render('application.ejs', { page: 'rules', user: req.session.user });
  });

  app.get('/teams', oidc.ensureAuthenticated(), (req, res) => {
    TeamsService.listAll(knex)
      .then(allTeams => {
        res.render('application.ejs', { page: 'teams', teams: allTeams, user: req.session.user });
        })
        .catch(err => {
          console.warn('Something went wrong:', err);
          res.status(500).send(err);
        });
  });
};
