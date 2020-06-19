module.exports = (app, knex, oidc) => {
  app.get('/season_settings', oidc.ensureAuthenticated(), (req, res) => {
    const user = req.session.user;
    if (user.is_admin) {
      knex.from("seasons").select("*").first().then((season) => {
        res.render('pages/application.ejs', { page: 'season_settings', user: user, season: season});
      });
    } else {
      res.redirect('/');
    };
  });
};
