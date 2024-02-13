// const express = require('express')
// const mongoose = require('mongoose')
// const Movie = require("../model/Movie")

// const reservationSchema = new mongoose.Schema({
//     // id: { 
//     //     type: Number, 
//     //     required: true 
//     // },
//     movie: { 
//         type: mongoose.Types.ObjectId,
//         ref: "Movie", 
//         required: true
//     },
//     date: { type: Date, required: true},
//     seatNumber: {type: Number, required: true}  
// });

// const Reservation = mongoose.model('Reservation', reservationSchema)

// module.exports = Reservation


const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
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

