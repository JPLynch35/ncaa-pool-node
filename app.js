if (process.env.NODE_ENV != 'production') require('dotenv').config();

const express = require('express');
const session = require('express-session');
// const path = require('path');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const knex = require('knex')(configuration);
const UsersService = require('./modules/usersService.js');
const oidc = new ExpressOIDC({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  appBaseUrl: process.env.APP_BASE_URL,
  redirect_uri: `${process.env.APP_BASE_URL}/authorization-code/callback`,
  scope: 'openid profile'
});

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);
// stores user object in session
app.use((req, res, next) => {
  if (req.userContext && req.userContext.userinfo) {
    const userInfo = req.userContext.userinfo;
    UsersService.findOrCreateUser(knex, userInfo).then(user => {
      req.session.user = user;
      return next();
    });
  } else {
    return next();
  };
});
app.use(express.static('public'));

require('./routes/index')(app, knex, oidc);
require('./routes/admin_index')(app, knex, oidc);

oidc.on('ready', () => {
  var port = process.env.PORT || 3000
  app.listen(port, () => console.log('Started!'));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});
