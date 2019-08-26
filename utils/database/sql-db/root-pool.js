const mysql = require('mysql');
const config = require('config');

const host = config.get('DB_HOST');
const user = config.get('DB_USERNAME');
const password = config.get('DB_PASSWORD');
const database = config.get('DB_NAME');

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  connectionLimit: 10,
  port: 3306
});

module.exports = pool;
