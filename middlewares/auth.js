require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/unAuthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;
const SECRET_KEY_DEV = 'hgdgaecwekdcerhcgeu';
const secretKey = NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError('Необходимо авторизоваться'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new UnAuthorizedError('Необходимо авторизоваться'));
  }
  req.user = payload;
  next();
  return false;
};
