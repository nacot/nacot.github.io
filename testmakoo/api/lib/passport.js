var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , User = require('../models/user')
  , config = require('../config')
  , url = require('url')
  
passport.ensureAuthenticated = function(req, res, next) {
  if (!req.isAuthenticated())
    return res.redirect('/login')
  next();
};
  
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id:id}, done);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({email: username}, function (err, user) {
      if (!user || !user.checkPassword(password)){
        return done(null, false, {message: 'Invalid login'});
      }      
      done(err, user);
    });
  }
));
passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID
  , clientSecret: config.facebook.clientSecret
  , callbackURL: url.format(config) + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    var data = profile._json;
    User.findOne()
    .or([{facebookId: data.id},{email: data.email}])
    .exec(function(err, user){
      if (err || !user)
        return User.register({
            facebookId: data.id
          , name: data.first_name
          , surname: data.last_name
          , email: data.email
        }, done);
      user.facebookId = data.id;
      user.save(done);
    });
  }
));

passport.use(new GoogleStrategy({
    returnURL: url.format(config) + '/auth/google/callback'
  , realm: url.format(config)
  },
  function(identifier, profile, done) {
    var data = profile;
    User.findOne()
    .or([{googleId: identifier},{email: data.emails[0].value}])
    .exec(function(err, user){
      if (err || !user)
        return User.register({
            googleId: identifier
          , name: data.name.givenName
          , surname: data.name.familyName
          , email: data.emails[0].value
        }, done);
      user.googleId = identifier;
      user.save(done);
    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey
  , consumerSecret: config.twitter.consumerSecret
  , callbackURL: url.format(config) + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    var data = profile._json
      , name = data.name.split(' ');
    User.findOne()
    .or([{twitterId: data.id},{email: data.email}])
    .exec(function(err, user){
      if (err || !user)
        return User.register({
            twitterId: data.id
          , name: name.shift()
          , surname: name.join(' ')
          , email: data.email
        }, done);
      user.twitterId = data.id;
      user.save(done);
    });
  }
));

var passport = require('passport')


module.exports = passport;