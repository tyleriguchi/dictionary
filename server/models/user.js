var bookshelf = require('../libs/Bookshelf');
var Words = require('./word');

module.exports = bookshelf.Model.extend({
  tableName: 'users',
  words: function() {
    return this.hasMany(Words);
  }
});
