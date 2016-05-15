'use strict'

module.exports = class Settings {
    rethinkData() {
      var settings = {
        "port" : 28015,
        "host" : "localhost",
        "db" : "Collections"
      };
      return settings;
    };

    twitData() {
      var settings = {
        "consumer_key" : "<<Your Consumer Key>>",
        "consumer_secret" : "<<Your Consumer Secret>>",
        "access_token" : "<<Your Access Token>>",
        "access_token_secret" : "<<Your Access Token Secret>>"
      };

      return settings;
    }
}
