require('dotenv').config()

const ATLAS_DB = process.env.ATLAS_DB
const ATLAS_DB_USER = process.env.ATLAS_DB_USER
const ATLAS_DB_PASS = process.env.ATLAS_DB_PASS
const ATLAS_DB_PORT = 5433

const ATLAS_DB_URI = `postgres://${ATLAS_DB_USER}:${ATLAS_DB_PASS}@localhost:${ATLAS_DB_PORT}/${ATLAS_DB}`

const API_PORT = process.env.API_PORT || 3001

module.exports = {
  ATLAS_DB,
  ATLAS_DB_PORT,
  ATLAS_DB_USER,
  ATLAS_DB_PASS,
  ATLAS_DB_URI,

  API_PORT
}
