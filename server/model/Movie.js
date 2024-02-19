const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    poster: { type: String, required: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    is_premier: { type: Boolean, required: true},
    premiereDate: { type: Date, required: false },
    airing_time: { type: mongoose.Schema.Types.ObjectId,
        ref: 'AiringTime',
        validate: {
            validator: async function (value) {
                const airingTime = await mongoose.model('AiringTime').findById(value);
                return airingTime !== null;
            },
            message: 'Invalid airing_time. AiringTime not found.',
        }, 
        required: false,
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
