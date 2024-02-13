const express = require('express');
const movieController = require('../controllers/movie-controllers');

const movieRouter = express.Router();

// Get all movies
movieRouter.get('/', movieController.getAllMovies);

// Get a specific movie by ID
movieRouter.get('/:id', movieController.getMovieById);

// Create a new movie
movieRouter.post('/', movieController.createMovie);

// Update a movie by ID
movieRouter.put('/:id', movieController.updateMovie);

// Delete a movie by ID
movieRouter.delete('/:id', movieController.deleteMovie);

module.exports = movieRouter;
