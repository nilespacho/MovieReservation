const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Movie schema
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  director: String,
  releaseYear: Number
});

// Create a Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Define a route to get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
