const router = require('express').Router();
const { validateRequestUpdateUserInfo } = require('../middlewares/validation');
const {
  getInfoUser, updateInfoUser,
} = require('../controllers/users');

router.get('/me', getInfoUser);
router.patch('/me', validateRequestUpdateUserInfo, updateInfoUser);

module.exports = router;
