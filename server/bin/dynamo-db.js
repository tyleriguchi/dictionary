var localDynamo = require('local-dynamo');
var AWS = require('aws-sdk');

localDynamo.launch({
  port: 4567
});


var dynamoDbOptions = {
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:4567',
  region: 'us-west-2'
};

var dynamoDb = new AWS.DynamoDB(dynamoDbOptions);

dynamoDb.listTables({}, function(err, data) {
  if (err) {
    return console.log(err, err.stack);
  }

  var tables = data.TableNames;

  if (tables.indexOf('dictionary') < 0) {
    var params = {
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ],
      AttributeDefinitions: [{
        AttributeName: 'id',
        AttributeType: 'S'
      }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      TableName: 'dictionary'
    };

    dynamoDb.createTable(params, function(err, result) {
      if (err) return console.log(err, err.stack);

      console.log('success', result);
    });
  }
  else {
    var params = {
      TableName: 'dictionary' /* required */
    };
    dynamoDb.describeTable(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log('Table existed', data);           // successful response
    });
  }

});
