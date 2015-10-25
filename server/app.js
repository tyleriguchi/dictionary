var Hapi = require('hapi');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017m/dictionary');

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

server.route(require('./routes/index'));
server.route(require('./routes/word/get'));
server.route(require('./routes/word/post'));
server.route(require('./routes/user/get'));
server.route(require('./routes/user/post'));
server.route(require('./routes/users/get'));
// server.route(require('./routes/users/post'));

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
