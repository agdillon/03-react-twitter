
exports.up = knex => knex.schema
  .createTable('secret_questions', (table) => {
    table.increments();
    table.string('question').notNullable();
  });

exports.down = knex => knex.schema.dropTable('secret_questions');
