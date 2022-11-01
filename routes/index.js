const router = require('express').Router();
const { validateRequestSignin, validateRequestSignup } = require('../middlewares/validation');
const { loginUser, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.use('/signup', validateRequestSignup, createUser);
router.use('/signin', validateRequestSignin, loginUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (res, req, next) => {
  next(new NotFoundError('Такого маршрута не существует'));
});

module.exports = router;
