const { celebrate, Joi } = require('celebrate');
const { linkRegExp } = require('../utils/linkRegEx');

module.exports.validateRequestUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateRequestSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateRequestSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateRequestDeleteMovie = celebrate({
  params: Joi.object().keys({
    idMovie: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateRequestCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkRegExp),
    trailerLink: Joi.string().required().regex(linkRegExp),
    thumbnail: Joi.string().required().regex(linkRegExp),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
