
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert(
      {
        id: '1',
        email: 'jaimielover@gmailcom',
        created_at: new Date()
      }
    ),

    knex('users').insert(
      {
        id: '2',
        email: 'tyrionthegiant@gmail.com',
        created_at: new Date()
      }
    ),

    knex('users').insert(
      {
        id: '3',
        email: 'jonsnow@gmail.com',
        created_at: new Date()
      }
    )
  );
};
