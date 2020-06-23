module.exports = (app, knex, oidc, storeUser, TeamsService) => {
  app.get('/local-logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  app.get('/', oidc.ensureAuthenticated(), storeUser, (req, res) => {
    res.redirect('/home');
  });

  app.get('/home', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'home', user: req.session.user });
  });

  app.get('/entries', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'entries', user: req.session.user });
  });

  app.get('/results', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'results', user: req.session.user });
  });

  app.get('/selections', oidc.ensureAuthenticated(), (req, res) => {
    TeamsService.listAll(knex)
      .then(allTeams => {
        res.render('pages/application.ejs', { page: 'selections', teams: allTeams, user: req.session.user });
        })
        .catch(err => {
          console.warn('Something went wrong:', err);
          res.status(500).send(err);
        });
  });

  app.get('/rules', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'rules', user: req.session.user });
  });

  app.get('/teams', oidc.ensureAuthenticated(), (req, res) => {
    TeamsService.listAll(knex)
      .then(allTeams => {
        res.render('pages/application.ejs', { page: 'teams', teams: allTeams, user: req.session.user });
        })
        .catch(err => {
          console.warn('Something went wrong:', err);
          res.status(500).send(err);
        });
  });
};
