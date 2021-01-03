require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const finale = require('finale-rest')

const uri = `postgres://${process.env.ATLAS_DB_USER}:${process.env.ATLAS_DB_PASS}@localhost:5433/${process.env.ATLAS_DB}`

const sequelize = new Sequelize(uri)

const PORT = process.env.ATLAS_DB_PORT || 3001

class JournalEntry extends Model {}

JournalEntry.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  memo: {
    type: DataTypes.STRING
  },
  geom: {
    type: DataTypes.GEOMETRY
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'JournalEntry' // We need to choose the model name
});

const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

var app, server;
app = server = restify.createServer()

const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins: ['*'], // Should whitelist actual domains in production
  allowHeaders: ['Authorization', 'API-Token', 'Content-Range'], //Content-range has size info on lists
  exposeHeaders: ['Authorization', 'API-Token-Expiry', 'Content-Range']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.queryParser()); //{mapParams: true}
server.use(restify.plugins.bodyParser());  //{mapParams: true, mapFiles: true}
server.use(restify.plugins.acceptParser(server.acceptable));

// Initialize finale
finale.initialize({
  app: app,
  sequelize
});

// Create REST resource
finale.resource({
  model: JournalEntry,
  endpoints: ['/journal-entries', '/journal-entries/:id']
});

// calling sequelize.sync() blows away the table each time the server restarts
server.listen(PORT, function() {
  console.log(`listening at http://localhost:${PORT}`);
});
