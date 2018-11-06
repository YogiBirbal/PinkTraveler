var mysql = require('mysql');
var config = require('./db_info').dev;

module.exports = function () {
  return {
    init: function () {
      return mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
      })
    },
    test_open: function (con) {
      console.log('MySQL Connection Test');
      con.connect(function (err) {
        if (err) {
          console.error('[-] MySQL connection error :' + err);
        } else {
          console.info('[+] MySQL is connected successfully.');
        }
      })
    }
  }
};
