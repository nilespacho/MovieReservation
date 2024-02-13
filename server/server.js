const express = require('express');
const port = process.env.PORT || 5000;
const Movie = require('./model/model')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();


app.use(cors())

//Since we are using .env environment variables
require("dotenv").config();
//Add the DB Config
// const dbConfig = require("./config/dbConfig");
//let us now start the server
app.listen(port, () => console.log(`Node JS Server is running on port ${port}`));

var database

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://ouano:maR1qcGZd2U4bXhk@cluster0.uecomlv.mongodb.net/Movie', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define the route to get movies
app.get('/movies', async (request, response) => {
    try {
        // Find all movies using the Mongoose model
        const movies = await Movie.find({});
        console.log('Movies:', movies)
        response.send(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        response.status(500).send("Internal Server Error");
    }
});
