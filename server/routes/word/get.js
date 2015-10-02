var request = require('request'),
    Boom    = require('../../lib/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    AWS     = require('aws-sdk');


var dynamoDbOptions =  {
  apiVersion: '2012-08-10',
  endpoint:  'http://localhost:4567',
  region: 'us-west-2'
};

var docClient = new AWS.DynamoDB.DocumentClient(dynamoDbOptions);

exports.route = {
  method: 'GET',
  path: '/word',
  handler: function(req, reply) {
    docClient.scan({
      TableName: 'dictionary',
    }, function(err, result) {
      if (err) {
        console.log(err)
        return reply(err)
      }
      console.log('re', result)
      return reply(result)
    });
  }
}
