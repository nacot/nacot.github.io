
var OAuth = require('oauth').OAuth
  , config = require('../config')

var oauth = new OAuth(
  "https://api.shapeways.com/oauth1/request_token/v1" 
,  "https://api.shapeways.com/oauth1/access_token/v1"
,  config.shapeways.consumerKey
,  config.shapeways.consumerSecret
,  '1.0'
,  config.shapeways.callbackURL
,  'HMAC-SHA1'
);
console.log("a");
oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
  if (error)
    console.log('error :' + JSON.stringify(error));
  console.log(arguments);
  oauth.getOAuthAccessToken('requestkey', 'requestsecret', function (err, oauth_token, oauth_token_secret, results){
    console.log('==>Get the access token');
    console.log(arguments);
  });
});


