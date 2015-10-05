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
  method: 'POST',
  path: '/users',
  handler: function(req, reply) {
    var data = req.payload.data;

    console.log(req.payload)
    dynamo.put({
      TableName: 'dictionary',
      Item: data,
    }, function dynamoResponse(err, data) {
      if (err){
        console.log('dynamoDB put Error', err);
        return reply(Boom.badImplementation('dyanmoDb put error'));
      }
      else {
        return reply(returnPayload);
      }
    });
  }
}
