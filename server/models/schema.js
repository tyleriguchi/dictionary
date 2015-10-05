var dbConfig = {
  client: 'pg',
  connection: {
    host     : 'http://localhost:5432',
    user     : 'tyleriguchi',
    password : '',
    database : 'postgres',
    charset  : 'utf8',
    debug: true
  }
};

var knex = require('knex')(dbConfig);

knex.schema.createTable('users', function (table) {
  console.log('creating')
  table.increments();
  table.string('name');
  table.timestamps();
})
