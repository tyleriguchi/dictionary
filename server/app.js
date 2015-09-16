var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  port: 3000,
});

// set the route prefixes
server.realm.modifiers.route.prefix = '/api/v1';

var indexRoute = require('./routes/index');
var dictionaryRoute = require('./routes/dictionary/index');

server.route(indexRoute);
server.route(dictionaryRoute);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
