module.exports = (app, oidc) => {
  app.get('/season_settings', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    if (user.is_admin) {
      res.render('pages/application.ejs', { page: 'season_settings', user: user });
    } else {
      res.redirect('/');
    };
  });
};
