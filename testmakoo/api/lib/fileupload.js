var config = require('../config')
  , paths = config.paths
  , path = require('path')
  , url = require('url')
  , Utils = require('../lib/utils')
  
var fileuploadPaths = {
  file: path.join(__dirname, '..', paths.public, paths.upload)
, s3: paths.upload 
};
var fileupload = require('fileupload')
  .createFileUpload(fileuploadPaths[config.fileupload], config.fileupload);
  
fileupload.schemaHelper = function(Schema, name, options){
  options = options || {};
  options.array = options.array || false;
  
  var pathFieldName = name ? name + 'Path' : 'path';
  var fieldName = name || 'file';
  var object = {};
  object[pathFieldName] = {}
  object[pathFieldName]['type'] = options.array ? [String] : String;
  Schema.add(object);
  
  var getOne = function (field) {
    if (!field)
      return  url.format(config) + '/' + options.default;
    
    if (field.substr(0,4)==='http')
      return field;
    return url.format(config) + '/' + paths.upload  + '/' + field;
    
  }
  var setOne = function (file) {
    if (!file)
      return '';
    var newPath = file.path + file.basename;
    if (file.url) 
      newPath = file.url;
    return newPath;
  }
 
  Schema.virtual(fieldName).set(function(files){
    if (!Utils.is('Array', files))
      files = [files];
    var paths = files.map(setOne, this);
    if (paths.length===0)
      return;
    if (options.array){
      this[pathFieldName] = paths;
    }else{
      this[pathFieldName] = paths[0];
    }
  });

  Schema.virtual(fieldName).get(function(){
    if (options.array){
      return this[pathFieldName].map(getOne, this);
    }else{
      return getOne.call(this, this[pathFieldName]);
    }
  });
};
  
module.exports = fileupload;