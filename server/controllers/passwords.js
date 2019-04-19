const _ = require('lodash');
const knex = require('../knex');
const { handleError, INV_REQ } = require('./utilities');

const getQuestions = async () => _.head(await (knex('secret_questions').select()));

console.log(getQuestions().then(data => console.log(data)));

// module.exports = {
//   getQuestions
// }