var mongoose = require('mongoose')
  , fileupload = require('../lib/fileupload')
  , timestamp = require('mongoose-timestamp')
  , hash = require('hash-password-default')

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var schema = new Schema({
 user: { type: ObjectId, ref: 'User' }
});

fileupload.schemaHelper(schema, 'audio');

module.exports = mongoose.model('order', schema);