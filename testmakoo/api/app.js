var express = require('express')
  , mongoose = require('mongoose')
  , baucis = require('baucis')
  , fs = require('fs')
  , path = require('path')
  

mongoose.connect('mongodb://localhost/makoo');

fs.readdirSync(path.join(__dirname, 'models')).forEach(function(file){
  if (file.match(/\.js$/)){
    require(path.join(__dirname, 'models', file));
    baucis.rest(file.replace(/.js$/, ''));
  }
});

var app = express();
app.use('/', baucis({ swagger: true }));
app.listen(3333);

console.log('Server listening on port 3333.');