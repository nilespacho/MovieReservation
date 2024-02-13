const Reservation = require("../model/Reservation");
const express = require("express");
const mongoose = require("mongoose");

// Define your controller handler function
const addReservation = async (req, res) => {
    try {
        const { mov_ID, airing_time, seats, total_price, is_cancelled } = req.body;

        // Check if mov_ID and airing_time are valid ObjectId strings
        if (!mongoose.isValidObjectId(mov_ID) || !mongoose.isValidObjectId(airing_time)) {
            return res.status(400).json({ status: 'error', error: 'Invalid mov_ID or airing_time' });
        }

        // Validate seat data
        if (!Array.isArray(seats) || seats.some(item => typeof item !== 'string')) {
            return res.status(400).json({ status: 'error', error: 'Invalid seat data' });
        }

        // Create reservation
const reservation = await Reservation.create({
    mov_ID,
    airing_time,
    seats,
    total_price,
    is_cancelled
});


        res.json({ status: 'ok', reservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
};



const getReservations = async (req, res) => {
    try {
        // Fetch all reservations
        const reservations = await Reservation.find();
        res.json({ status: 'ok', reservations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
};

// Export the named functions
module.exports = {
    addReservation,
    getReservations,
};




 
// const newReservation = async (req, res, next) => {
//     const { movie, date, seatNumber } = req.body;
  
//     try {
//       // Fetch the existingMovie from the database
//       const existingMovie = await Movie.findById(movie);
  
//       if (!existingMovie) {
//         return res.status(404).json({ message: "Movie not found" });
//       }
  
//       // Ensure that existingMovie.reserve is an array
//       existingMovie.reserve = existingMovie.reserve || [];
  
//       // Create a new Reservation instance
//       const reserve = new Reservation({
//         movie,
//         date: new Date(`${date}`),
//         seatNumber,
//       });
  
//       const session = await mongoose.startSession();
//       session.startTransaction();
  
//       // Push the new reservation to the existingMovie.reserve array
//       existingMovie.reserve.push(reserve);
  
//       await existingMovie.save({ session });
//       await reserve.save({ session });
  
//       session.commitTransaction();
  
//       return res.status(200).json({ reserve });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Unable to create a booking" });
//     }
//   };
  
//   module.exports = newReservation;
  
