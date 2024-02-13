const mongoose = require('mongoose');
const AiringTime = require('./AiringTime'); // Adjust the path based on your project structure

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    poster: { type: String, required: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    // airing_time: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'AiringTime', // Reference to the AiringTime model
    // },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
