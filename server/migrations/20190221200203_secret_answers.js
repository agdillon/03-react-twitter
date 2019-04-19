
exports.up = knex => knex.schema
  .createTable('secret_answers', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
    table.integer('question_id').notNullable().references('secret_questions.id').onDelete('CASCADE');
    table.string('secret_answer');
  })

exports.down = knex => knex.schema.dropTable('secret_answers');
