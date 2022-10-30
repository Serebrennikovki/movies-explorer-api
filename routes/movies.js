const router = require('express').Router();
const { validateRequestDeleteMovie, validateRequestCreateMovie } = require('../middlewares/validation');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateRequestCreateMovie, createMovie);
router.delete('/:idMovie', validateRequestDeleteMovie, deleteMovie);

module.exports = router;
