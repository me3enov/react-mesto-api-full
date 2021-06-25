const users = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validateId,
  validateUserUpdate,
  validateAvatar,
} = require('../middlewares/requestValidation');

const {
  getUsers,
  getCurrentUser,
  aboutUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

users.get('/users', auth, getUsers);

users.get('/users/:_id', validateId, auth, getCurrentUser);

users.get('/users/me', auth, aboutUser);

users.patch('/users/me', validateUserUpdate, auth, updateUser);

users.patch('/users/me/avatar', validateAvatar, auth, updateAvatar);

module.exports = users;
