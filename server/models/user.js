var Bookshelf = require('../libs/Bookshelf');
var Words = require('./word');

module.exports = Bookshelf.Model.extend({
  tableName: 'users',

  words: function() {
    return this.hasMany(Words, 'word_id');
  }
});
