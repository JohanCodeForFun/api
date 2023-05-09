// load .env
require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  password: process.env.password,
  host: 'localhost',
  port: 5432,
  database: 'library-system'
});

module.exports = pool;