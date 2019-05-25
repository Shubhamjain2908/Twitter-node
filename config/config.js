require('dotenv').config();
require('./../global_constants').CONFIG;

CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_name = process.env.DB_NAME || 'twitter';
CONFIG.db_user = process.env.DB_USER || 'postgres';
CONFIG.db_password = process.env.DB_PASSWORD || 'postgres';

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: CONFIG.db_host,
        user: CONFIG.db_user,
        password: CONFIG.db_password,
        database: CONFIG.db_name
    },
    debug: true
});


module.exports = {
    development: {
        username: CONFIG.db_user,
        password: CONFIG.db_password,
        database: CONFIG.db_name,
        host: CONFIG.db_host,
        dialect: CONFIG.db_dialect
    },
    test: {
        username: CONFIG.db_user,
        password: CONFIG.db_password,
        database: CONFIG.db_name,
        host: CONFIG.db_host,
        dialect: CONFIG.db_dialect
    },
    production: {
        username: CONFIG.db_user,
        password: CONFIG.db_password,
        database: CONFIG.db_name,
        host: CONFIG.db_host,
        dialect: CONFIG.db_dialect
    },
    knex: knex,
}
