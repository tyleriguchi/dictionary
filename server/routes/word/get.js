var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    AWS     = require('aws-sdk');


var dynamoDbOptions =  {
  apiVersion: '2012-08-10',
  endpoint:  'http://localhost:4567',
  region: 'us-west-2'
};

var dynamo = new AWS.DynamoDB.DocumentClient(dynamoDbOptions);

module.exports = {
  method: 'GET',
  path: '/word',
  handler: function(req, reply) {
    dynamo.scan({
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
