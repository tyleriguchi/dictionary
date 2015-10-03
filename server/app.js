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

var indexRoute = require('./routes/index');
var defineGetRoute = require('./routes/word/get');
var definePostRoute = require('./routes/word/post');

server.route(indexRoute);
server.route(defineGetRoute);
server.route(definePostRoute);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
