require('dotenv').config();

const express = require('express');
const session = require('express-session');
// const bodyParser = require('body-parser');
const passport = require('passport');
const OidcStrategy = require('passport-openidconnect').Strategy;
const path = require('path');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// set up passport to use Okta as the Identity Provider (IdP)
passport.use('oidc', new OidcStrategy({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  authorizationURL: `https://${process.env.OKTA_DOMAIN}/oauth2/default/v1/authorize`,
  tokenURL: `https://${process.env.OKTA_DOMAIN}/oauth2/default/v1/token`,
  userInfoURL: `https://${process.env.OKTA_DOMAIN}/oauth2/default/v1/userinfo`,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile'
}, (issuer, sub, profile, accessToken, refreshToken, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});

require('./routes/index')(app, passport, database, path);

app.listen(3000, function() {});
