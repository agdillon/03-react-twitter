exports.seed = knex => knex('secret_questions').del()
  .then(() => knex('secret_questions')
    .insert([
      {
        id: 1,
        question: "What is your favorite pet's name?"
      },
      {
        id: 2,
        question: "What was your first car model?"
      },
      {
        id: 3,
        question: "What is your favorite color?"
      }
    ]))
  .then(() => knex.raw('SELECT setval(\'secret_questions_id_seq\', (SELECT MAX(id) FROM secret_questions));'));
