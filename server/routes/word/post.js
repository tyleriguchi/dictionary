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

// var awsClient = new AWS.DynamoDB(dynamoDbOptions);
var dynamo = new AWS.DynamoDB.DocumentClient(dynamoDbOptions);

module.exports = {
  method: 'POST',
  path: '/word',
  handler: function (req, reply) {
    var attrs = req.payload.data.attributes;

    if (attrs.word == null || attrs.word === '') {
      return reply(Boom.badRequest('Please enter a word'));
    }

    var options = {
      method: 'GET',
      url: process.env.MashapeUrl + '/words/' + attrs.word,
      accept: 'application/json',
      'Content-type': 'application/json',
      json: true,
      headers: {
        'X-Mashape-Key': process.env.MashapeKey
      }
    }

    request(options, function request(err, res) {
      var definitionData = res.body.results;

      if (err) {
        return reply(Boom.badRequest(err));
      }

      // throw error if null or undefined
      if (definitionData == null) {
        return reply(Boom.notFound('No definition found'))
      }

      var definitionsArray = definitionData.map(function definitionsArray(item) {
        item.id = UUID.v4();
        item.type ='definition';
        return item;
      })

      attrs.definitions = definitionsArray;

      var returnPayload = {
        data: {
          type: 'word',
          id: attrs.word,
          attributes: attrs,
        }
      }

      if (attrs['is-authenticated'] === true) {
        dynamo.put({
          TableName: 'dictionary',
          Item: {
           id: attrs.word,
           definitions: attrs.definitions,
          },
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

      else {
        return reply(returnPayload);
      }
    });
  }
}
