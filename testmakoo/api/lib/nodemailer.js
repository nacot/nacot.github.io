var nodemailer = require('nodemailer')
  , config = require('../config')
  , Utils = require('../lib/utils')

var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: config.gmail
});

var defaultOptions = {
  from: "Team Ospita.me <hello@ospita.me>"
};

module.exports = function(options){
  options || (options = {});
  for (var i in defaultOptions)
    options[i] || (options[i] = defaultOptions[i]);
  smtpTransport.sendMail(options, function(error, response){
    if(error)
        return console.log(error);
    console.log(response);
  }); 

};