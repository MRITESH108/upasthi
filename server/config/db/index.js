const pkg = require('pg');
const dotenv = require('dotenv');
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
});

pool.connect()
    .then(() => console.log('Postgre database connected'))
    .catch(err => console.error('Postgre database connection error', err));

module.exports = pool;