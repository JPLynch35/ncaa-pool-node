if (process.env.NODE_ENV != 'production') require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const knex = require('knex')(configuration);
const SeasonsService = require('./modules/seasonsService.js');
const TeamsService = require('./modules/teamsService.js');
const UsersService = require('./modules/usersService.js');
const oidc = new ExpressOIDC({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  appBaseUrl: process.env.APP_BASE_URL,
  redirect_uri: `${process.env.APP_BASE_URL}/authorization-code/callback`,
  scope: 'openid profile'
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);
app.use(express.static('public/'));

// automatically apply the `storeUser` middleware to all routes
storeUser = function (req, res, next) {
  if (req && req.userContext && req.userContext.userinfo && !req.session.user) {
    const userInfo = req.userContext.userinfo;
    UsersService.findOrCreateUser(knex, userInfo)
      .then(user => {
        req.session.user = user;
        next();
      })
      .catch(err => {
        console.warn('Something went wrong:', err);
        next();
      });
  } else {
    next();
  };
};
app.all("/*", storeUser, function(req, res, next) {
  next();
});

// automatically apply the `requireAdmin` middleware to all routes starting with `/admin`
requireAdmin = (req, res, next) => {
  const user = req.session.user;
  if (!user.is_admin) {
    res.redirect('/home');
  } else {
    next();
  };
};
// TODO storeUser does not store user for requireAdmin check
app.all("/admin/*", storeUser, requireAdmin, function(req, res, next) {
  next();
});

require('./routes/index')(app, knex, oidc, SeasonsService, TeamsService, UsersService);
require('./routes/admin/index')(app, knex, oidc, SeasonsService);
require('./routes/api/admin/index')(app, knex, oidc, SeasonsService);

oidc.on('ready', () => {
  var port = process.env.PORT || 3000
  app.listen(port, () => console.log('Started!'));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});
