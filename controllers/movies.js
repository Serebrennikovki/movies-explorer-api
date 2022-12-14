const Movie = require('../models/movie');
const NoRightsError = require('../errors/noRightsError');
const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.idMovie)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(`Карточка с указанным ${req.params.idMovie} не найдена.`);
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new NoRightsError(`Карточка с указанным ${req.params.cardId} не может быть удалена. Нет прав.`);
      }
      return Movie.findByIdAndRemove(req.params.idMovie)
        .then((movieDeleted) => res.send(movieDeleted));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Передан некорректный id карточки'));
      } else {
        next(error);
      }
    });
};
