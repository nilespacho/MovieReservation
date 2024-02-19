const express = require('express');
const movieController = require('../controllers/movie-controllers');
const movieRouter = express.Router();
movieRouter.get('/', movieController.getAllMovies);
movieRouter.get('/:id', movieController.getMovieById);
movieRouter.post('/', movieController.createMovie);
movieRouter.put('/:id', movieController.updateMovie);
movieRouter.delete('/:id', movieController.deleteMovie);
module.exports = movieRouter;