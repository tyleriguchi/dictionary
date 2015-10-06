var Bookshelf = require('../libs/Bookshelf');
var Words = require('./word');

exports.User = Bookshelf.Model.extend({
  tableName: 'users',
  
  words: function() {
    return this.hasMany(Words);
  }
});

// exports.Users = Bookshelf.Collection.extend({
//   model: User
// })
