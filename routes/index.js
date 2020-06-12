module.exports = (app, passport, database, path) => {

  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard')
    } else {
      return res.redirect('/login')
    };
  });

  app.get('/login', passport.authenticate('oidc'));

  app.get('/authorization-code/callback',
    passport.authenticate('oidc', { failureRedirect: '/error' }),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/dashboard', ensureLoggedIn, (req, res) => {
    // database('teams').then((teams) => {
    //   res.send(teams);
    // });
    // res.sendFile(path.join(appPath, 'dashboard/dashboard.html'));
    res.render('pages/dashboard.ejs', { title: 'Dashboard' });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

  function ensureLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login')
  }
};
