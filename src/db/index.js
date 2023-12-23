const config = require('../config/config');

const knex = require('knex')({
    client: 'pg',
    connection: {
      user: config.pg.user,
      database: config.pg.database,
      password: config.pg.password,
      port: config.pg.port,
      host: config.pg.host,
    },
  });
  knex
  .raw('SELECT 1')
  .then(() => {
    console.log('PostgreSQL connection successful');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error.message);
  });

module.exports = knex;
