var Utils = {}

/* clone
* Clone an object and return a references-free clone
*/
Utils.clone = function(object) {
  if (!object) {
    return;
  }
  var result;
  if (Utils.is('Object', object)) {
    result = {};
  }else if (Utils.is('Array', object)) {
    result = [];
  }else{
    return object;
  }
  
  for(var key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    var isObjectOrArray = object[key] &&
                          (Utils.is('Object', object[key]) || 
                          Utils.is('Array', object[key]));
    
    if (isObjectOrArray) {
        result[key] = Utils.clone(object[key]);
    }else{
        result[key] = object[key];
    }
  }
  return result;
};

/* merge
* Merge object2 in object1
*/
Utils.merge = function(object1, object2) {
  for (var key in object2) {
    if (!object2.hasOwnProperty(key)) {
      continue;
    }
    var isObjectOrArray = object2[key] && 
                          (Utils.is('Object', object2[key]) ||
                          Utils.is('Array', object2[key]));
    if (object1[key] && isObjectOrArray) {
      if (Utils.is('Object', object2[key])) {
        if (!Utils.is('Object', object1[key])) {
            object1[key] = {};
        }
      }
      if (Utils.is('Array', object2[key])) {
        if (!Utils.is('Array', object1[key])) {
            object1[key] = [];
        }
      }
      Utils.merge(object1[key], object2[key]);
    }else{
      if (object2[key]!==null) { //This fixes arrays merging
          object1[key] = object2[key];
      }
    }
  }
  return object1;
};

/* each
* Cycle recursively over each item which is not an object or an array
  * Execute an action(object, key, path)
*/
Utils.each = function(object, action, path) {
  for (var key in object) {
    var newPath = path ? path.slice() : [];
    newPath.push(key);
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    var isObjectOrArray = object[key] &&
                          (Utils.is('Object', object[key]) ||
                          Utils.is('Array', object[key]));
    if (object[key] && isObjectOrArray) {
      Utils.each(object[key], action, newPath);
    }else{
      action(object, key, newPath);
    }
  }
};

/* select
* Select a given path in an object 
* Returns the value or a slice of the object containing that path
*/
Utils.select = function(object, path, returnValue) {
  var current = path.shift();
  if (!current)
    return object; 
  
  var result;
  if (Utils.is('Object', object)) {
    result = {};
  }
  if (Utils.is('Array', object)) {
    result = [];
  }
  if(typeof object[current] !== 'undefined' && path.length>0) {
    result[current] = Utils.select(object[current], path, returnValue);
  }else{
    result[current] = object[current];
  }
  if (returnValue) {
    return result[current];
  }else{
    return result;
  }
};

/* is
 * Check an object type
 */

Utils.is = function(type, object){
  return Object.prototype.toString.call(object) == '[object ' + type + ']';
};


/* compose
 * Compose the functions passed as arguments
 * Every function will be fed with the return value of the function on the right
 */

Utils.compose = function(){
  var funcs = arguments;
    return function() {
      var args = arguments
        , i = funcs.length
      while(i--)
        args = [funcs[i].apply(this, args)];
      return args[0];
    };
};

/* dasherize
 * Return a dash-separated string given a CamelCase string
 */

Utils.dasherize = function(camelCaseString){
  return camelCaseString.replace(/(.)([A-Z])/g, '$1-$2').toLowerCase();
}

/* camelize
 * Return a camelCase string given a dash-separated string
 */

Utils.camelize = function(dashSeparatedString){
  return dashSeparatedString.toLowerCase().replace(/-([a-z])/g, function (m, w) {
    return w.toUpperCase();
  });
}


module.exports = Utils;