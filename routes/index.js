const router = require('express').Router();
const { validateRequestSignin, validateRequestSignup } = require('../middlewares/validation');
const { loginUser, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use('/signup', validateRequestSignup, createUser);
router.use('/signin', validateRequestSignin, loginUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
