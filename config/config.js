const {
  ATLAS_DB,
  ATLAS_DB_USER,
  ATLAS_DB_PASS,
  ATLAS_DB_PORT
} = require('.')

module.exports = {
  development: {
    username: ATLAS_DB_USER,
    password: ATLAS_DB_PASS,
    database: ATLAS_DB,
    host: "127.0.0.1",
    port: ATLAS_DB_PORT,
    dialect: "postgres"
  }
  // production: {
  //   username: ATLAS_DB_USER,
  //   password: ATLAS_DB_PASS,
  //   database: ATLAS_DB,
  //   host: "127.0.0.1",
  //   port: ATLAS_DB_PORT,
  //   dialect: "postgres"
  // }
}
