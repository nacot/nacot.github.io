var mongoose = require('mongoose')
  , timestamp = require('mongoose-timestamp')
  , hash = require('hash-password-default')

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var schema = new Schema({
  email: { 
    type: String 
  , match: /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+$/
  , unique: true  
  }
, hash: String 
, name: String
, surname: String
, address: String
, activated: { type: Boolean, default: false }
, facebookId: String
, googleId: String
, twitterId: String
});

schema.virtual('password').set(function (password) {
  this.hash = hash.hashPassword(password);
});

schema.virtual('password').get(function () {
  return this.hash;
});

schema.methods.checkPassword = function (password) {
  return hash.checkPassword(this.password || "", password);
};

module.exports = mongoose.model('user', schema);