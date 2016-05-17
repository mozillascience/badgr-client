'use strict';

function Client(options) {
  var client = {};
  var username, password;

  if ( !options || !options.username || !options.password ){
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      username = process.env.BADGR_CLIENT_USERNAME;
      password = process.env.BADGR_CLIENT_PASSWORD;
    } else {
      var errorString = 'Badgr Client requires a username and passwords set explicitly ' +
        'or via the BADGR_CLIENT_USERNAME and BADGR_CLIENT_PASSWORD environment variables';
      throw new Error(errorString);
    }
  }

  username = options.username;
  password = options.password;
  console.log(username, password);

  return client;

}

module.exports = Client;
