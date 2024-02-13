const Movie = require('../model/Movie');

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ status: 'ok', movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
};

// Get a specific movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ status: 'error', error: 'Movie not found' });
    }
    res.json({ status: 'ok', movie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const { title, genre, poster, director, releaseYear} = req.body;

    const movie = await Movie.create({
      title,
      genre,
      poster,
      director,
      releaseYear,
    });

    res.json({ status: 'ok', movie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
};

// Update a movie by ID
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, poster, director, releaseYear} = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, poster, director, releaseYear},
      { new: true }
    )

    if (!updatedMovie) {
      return res.status(404).json({ status: 'error', error: 'Movie not found' });
    }

    res.json({ status: 'ok', movie: updatedMovie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ status: 'error', error: 'Movie not found' });
    }

    res.json({ status: 'ok', message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
