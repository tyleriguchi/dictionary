var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  port: 3000,
  routes: {
    cors: true
  }
});

// set the route prefixes

server.realm.modifiers.route.prefix = '/api/v1';

var indexRoute = require('./routes/index').route;
var defineRoute = require('./routes/word/index').route;

server.route(indexRoute);
server.route(defineRoute);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
