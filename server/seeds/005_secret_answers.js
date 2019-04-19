exports.seed = knex => knex('secret_answers').del()
  .then(() => knex('secret_answers')
    .insert([
      {
        id: 1,
        user_id: 1,
        question_id: 1,
        secret_answer: 'Jamie'
      },
      {
        id: 2,
        user_id: 1,
        question_id: 2,
        secret_answer: 'Camry'
      },
      {
        id: 3,
        user_id: 1,
        question_id: 3,
        secret_answer: 'Green'
      }
    ]))
  .then(() => knex.raw('SELECT setval(\'secret_answers_id_seq\', (SELECT MAX(id) FROM secret_answers));'));
