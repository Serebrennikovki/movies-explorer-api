const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const EmailExistError = require('../errors/emailExistError');
const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');

const { NODE_ENV, SECRET_KEY } = process.env;
const SECRET_KEY_DEV = 'hgdgaecwekdcerhcgeu';
const secretKey = NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((userInfo) => {
          res.send({
            _id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Не правильно введены пароль или почта'));
          } else if (err.code === 11000) {
            next(new EmailExistError('Данный email уже зарегистрирован'));
          } else { next(err); }
        });
    })
    .catch(next);
};

module.exports.getInfoUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((userInfo) => {
      if (!userInfo) {
        throw new NotFoundError(`Пользователь по указанному ${req.params.userId} не найден`);
      }
      return res.send(userInfo);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Передан некорректный id'));
      } else { next(error); }
    });
};

module.exports.updateInfoUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((newUserInfo) => { res.send(newUserInfo); })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      } else { next(error); }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((userData) => {
      const loginData = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
      };
      const token = jwt.sign({ _id: userData._id }, secretKey, { expiresIn: '7d' });
      return res.status(200).send({ jwt: token, user: loginData });
    })
    .catch((err) => {
      next(err);
    });
};
