'use strict';

function Client(options) {
  var client = {};
  var username, password;

  if ( !options || !options.username || !options.password ){
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      username = process.env.BADGR_CLIENT_USERNAME;
      password = process.env.BADGR_CLIENT_PASSWORD;
    }
    else {
      throw new Error('Badgr Client requires a username and passwords set explicitly ' +
          'or via the BADGR_CLIENT_USERNAME and BADGR_CLIENT_PASSWORD environment variables');
    }
  }

  username = options.username;
  password = options.password;

  return client;

};

module.exports = Client;
