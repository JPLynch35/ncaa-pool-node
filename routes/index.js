module.exports = (app, knex, oidc) => {
  app.get('/local-logout', oidc.ensureAuthenticated(), (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'home', user: req.session.user });
  });

  app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
    res.render('pages/application.ejs', { page: 'profile', user: req.session.user });
  });

  app.get('/teams', oidc.ensureAuthenticated(), (req, res) => {
    let teams = knex('teams').select();
    Promise.resolve(teams)
      .then(teams => {
        res.render('pages/application.ejs', { page: 'teams', teams: teams, user: req.session.user });
      });
  });
};
