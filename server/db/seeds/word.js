
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('words').del(),

    // Inserts seed entries
    knex('words').insert(
      {
        id: "test",
        definitions: ['this', 'is', 'a', 'test'],
        user_id: "1"
      }
    )
  );
};
