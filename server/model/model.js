const express = require('express')
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    genre: { type: String, required: true},
    // poster: { type: String, required: true},
    director: { type: String, required: true},
    releaseYear: { type: Number, required: true},
});

const Movie = mongoose.model('Movie', movieSchema, 'movies')

module.exports = Movie

