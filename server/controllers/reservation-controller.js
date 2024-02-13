const Reservation = require("../model/Reservation")
const express = require("express")
const mongoose = require("mongoose")
const addReservation = express.Router()

addReservation.post('/addReservation', async (req, res) => {
    console.log(req.body);
    try {
        const { mov_ID, airing_time, seat, discount, total_price, is_cancelled } = req.body;

        // Ensure correct data types
        const isValidObjectId = mongoose.Types.ObjectId.isValid(mov_ID);
        if (!isValidObjectId) {
            return res.status(400).json({ status: 'error', error: 'Invalid mov_ID' });
        }

        if (!Array.isArray(seat)
 || seat.some(item => typeof item !== 'object')) {
            return res.status(400).json({ status: 'error', error: 'Invalid seat data' });
        }

        const reservation = await Reservation.create({
            mov_ID: mongoose.Types.ObjectId(mov_ID),
            airing_time: mongoose.Types.ObjectId(airing_time), 
            seat,
            discount,
            total_price,
            is_cancelled
        });
        res.json({ status: 'ok', reservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

module.exports = addReservation;


 
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
  
