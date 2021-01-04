const { Sequelize, Model, DataTypes } = require('sequelize')
const finale = require('finale-rest')

const { API_PORT, ATLAS_DB_URI } = require('./config/')

const sequelize = new Sequelize(ATLAS_DB_URI)

const models = require('./models')

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
  model: models.Journal,
  endpoints: ['/journals', '/journals/:id']
});

// calling sequelize.sync() blows away the table each time the server restarts
server.listen(API_PORT, function() {
  console.log(`listening at http://localhost:${API_PORT}`);
});
