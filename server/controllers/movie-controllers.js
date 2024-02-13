const Movie = require('../model/Movie');

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('airing_time');
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
    const movie = await Movie.findById(id).populate('airing_time');
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
    const { title, genre, poster, director, releaseYear/*, airing_time*/ } = req.body;

    // Check if airing_time exists
    // const airingTimeExists = await AiringTime.findById(airing_time);
    // if (!airingTimeExists) {
    //   return res.status(400).json({ status: 'error', error: 'Invalid airing_time ID' });
    // }

    const movie = await Movie.create({
      title,
      genre,
      poster,
      director,
      releaseYear,
    //   airing_time,
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
    const { title, genre, poster, director, releaseYear/*, airing_time*/} = req.body;

    // Check if airing_time exists
    // const airingTimeExists = await AiringTime.findById(airing_time);
    // if (!airingTimeExists) {
    //   return res.status(400).json({ status: 'error', error: 'Invalid airing_time ID' });
    // }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, poster, director, releaseYear/*, airing_time*/},
      { new: true }
    )/*.populate('airing_time');*/

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
