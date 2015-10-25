var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var wordSchema = new Schema({
  _id: String,
  created_at: Date,
  user_id: String,
  word: String,
  definitions: []
});

// the schema is useless so far
// we need to create a model using it
var Word = mongoose.model('Word', wordSchema);

// make this available to our users in our Node applications
module.exports = Word;
