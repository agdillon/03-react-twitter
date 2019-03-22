const _ = require('lodash');
const bcrypt = require('bcrypt');
const validator = require('validator');
const knex = require('../knex');

const SALT_ROUNDS = 10;
const { handleError, INV_REQ } = require('./utilities');

const findUserByEmail = async email => _.head(await knex('users').where('email', email));

const findUserByHandle = async handle => _.head(await knex('users').where('handle', handle));

const findUserById = async userId => _.head(await knex('users').where('id', userId));

const loginUser = async (req, res, next) => {
  try {
    const { handle, password } = req.body;
    if (!handle || !password) return handleError(res, next, INV_REQ);

    const user = await findUserByHandle(handle);
    if (!user) return handleError(res, next, INV_REQ);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return handleError(res, next, INV_REQ);

    delete user.password;
    res.data = user;
    return next();
  } catch (err) {
    return handleError(res, next);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      handle, name, email, avatar, password, bio, location, birthday
    } = req.body;
    if (!handle || !password || !name || !email
      || !validator.isEmail(email)) return handleError(res, next, INV_REQ);

    const dbUser = await Promise.all([findUserByEmail(email), findUserByHandle(handle)]);
    if (dbUser[0]) return handleError(res, next, 'Email is already in use.');
    if (dbUser[1]) return handleError(res, next, 'Handle is already in use.');

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    if (!hashedPassword) return handleError(res, next, INV_REQ);

    const userInfo = {
      name,
      handle,
      email,
      password: hashedPassword,
      bio,
      location,
      birthday
    };
    if (avatar && validator.isBase64(avatar)) userInfo.avatar = avatar;

    const insertedUser = _.head(await knex('users').insert(userInfo).returning(['id', 'name', 'handle', 'email', 'avatar', 'bio', 'location', 'birthday']));
    res.data = insertedUser;
    return next();
  } catch (err) {
    return handleError(res, next);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      userId, avatar
    } = req.body;
    let userInfo = {};

    if (!userId) return handleError(res, next, INV_REQ);
    if (avatar) {
      if (!validator.isBase64(avatar.replace(/data:.*;base64,/, ''))) {
        return handleError(res, next, INV_REQ)
      }
      userInfo.avatar = avatar;
    }

    const dbUser = await findUserById(userId);
    if (!dbUser) return handleError(res, next, 'User Id does not exist.');

    let updatedUser = await knex('users')
      .where('id', userId)
      .update(userInfo)
      .returning(['id', 'name', 'handle', 'email', 'avatar', 'bio', 'location', 'birthday']);

    res.data = updatedUser;
    return next();
  } catch (err) {
    return handleError(res, next);
  }
};

module.exports = {
  loginUser,
  createUser,
  updateUser,
  findUserByEmail,
  findUserByHandle
};
