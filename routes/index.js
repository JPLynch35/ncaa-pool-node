module.exports = (app, knex, oidc, UsersService) => {
  app.get('/local-logout', oidc.ensureAuthenticated(), (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'home', user: req.session.user });
  });

  app.get('/user/entries', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'entries', user: req.session.user });
  });

  app.get('/results', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'results', user: req.session.user });
  });

  app.get('/user/selections', oidc.ensureAuthenticated(), (req, res) => {
    const allTeams = knex('teams').select();
    Promise.resolve(allTeams)
      .then(allTeams => {
        res.render('pages/application.ejs', { page: 'selections', teams: allTeams, user: req.session.user });
      });
  });

  app.get('/rules', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'rules', user: req.session.user });
  });

  app.get('/teams', oidc.ensureAuthenticated(), (req, res) => {
    const allTeams = knex('teams').select();
    Promise.resolve(allTeams)
      .then(allTeams => {
        res.render('pages/application.ejs', { page: 'teams', teams: allTeams, user: req.session.user });
      });
  });
};
