const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
const { defaultUser } = require('../utils/constants');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Invalid URL');
  }
  return value;
};

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(urlValidation).required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .default(defaultUser.name),
    about: Joi.string().min(2).max(20)
      .default(defaultUser.about),
    avatar: Joi.string().custom(urlValidation)
      .default(defaultUser.avatar),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .default(defaultUser.name),
    about: Joi.string().required().min(2).max(20)
      .default(defaultUser.about),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidation).required()
      .default(defaultUser.avatar),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateCard,
  validateId,
  validateUser,
  validateUserUpdate,
  validateAvatar,
  validateLogin,
};