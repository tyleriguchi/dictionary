var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    AWS     = require('aws-sdk'),
    User    = require('../../models/user');


var dynamoDbOptions =  {
  apiVersion: '2012-08-10',
  endpoint:  'http://localhost:4567',
  region: 'us-west-2'
};

var dynamo = new AWS.DynamoDB.DocumentClient(dynamoDbOptions);

module.exports = {
  method: 'GET',
  path: '/users',
  handler: function(req, reply) {
    User.fetchAll().then(function(users) {
      console.log('ser', users)
      reply(users);
    })
  }
}
