const config = require('./config/default.json');

module.exports = {
  development: {
    ...config.pg
  },

  production: {
    ...config.pg,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
