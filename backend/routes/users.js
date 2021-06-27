const users = require('express').Router();

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

users.get('/users', getUsers);

users.get('/users/me', validateId, aboutUser);

users.patch('/users/me', validateUserUpdate, updateUser);

users.patch('/users/me/avatar', validateAvatar, updateAvatar);

users.get('/users/:_id', validateId, getCurrentUser);

module.exports = users;
