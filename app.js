require('dotenv').config();

const express = require('express');
const session = require('express-session');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const path = require('path');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const app = express();
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
app.use(express.static('public'));
// app.use('/favicon.ico', express.static('public/images/favicon.ico'));

require('./routes/index')(app, database, oidc, path);

oidc.on('ready', () => {
  var port = process.env.PORT || 3000
  app.listen(port, () => console.log('Started!'));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});