var Bookshelf = require('../libs/Bookshelf');
var Words = require('./word');
var User = require('./user')
module.exports = Bookshelf.Model.extend({
  tableName: 'words',

  user: function() {
    return this.belongsTo(User, 'user_id');
  }
});
