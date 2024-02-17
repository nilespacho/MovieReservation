const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservation_id: {
        type: String,
        required: true,
        unique: true // Ensure reservation IDs are unique
    },
    mov_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
        validate: {
            validator: async function (value) {
                const movie = await mongoose.model('Movie').findById(value);
                return movie !== null;
            },
            message: 'Invalid mov_ID. Movie not found.',
        },
    },
    airing_time: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AiringTime',
        validate: {
            validator: async function (value) {
                const airingTime = await mongoose.model('AiringTime').findById(value);
                return airingTime !== null;
            },
            message: 'Invalid airing_time. AiringTime not found.',
        },
    },
    seats: {
        type: [String], // Assuming seats are represented as strings
        required: true,
    },
    total_price: Number,
    is_cancelled: Boolean,
});




const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
