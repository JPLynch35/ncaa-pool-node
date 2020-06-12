module.exports = (app, database, oidc, path) => {

  app.get('/', (req, res) => {
    if (req.userContext) {
      res.render('pages/root.ejs', {  });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
    var userInfo = req.userContext
    console.log(userInfo)
    res.render('pages/profile.ejs', { userInfo: userInfo });
  });

  app.get('/teams', oidc.ensureAuthenticated(), (req, res) => {
    let teams = database('teams').select();
    Promise.resolve(teams)
      .then(teams => {
        res.render('pages/teams.ejs', { teams: teams });
      })
  })
};
