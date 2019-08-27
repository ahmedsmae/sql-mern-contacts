const mysql = require('mysql');

const host = process.env.DB_HOST;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  connectionLimit: 10,
  port: 3306
});

module.exports = pool;
