
// reservation-routes.js

const express = require('express');
const { addReservation, getReservations, deleteReservation, getReservationById, updateReservationCancelledStatus } = require('../controllers/reservation-controller');

const reservationRouter = express.Router();

// Add the POST and GET endpoints
reservationRouter.post('/addReservation', addReservation);
reservationRouter.get('/getReservations', getReservations);
reservationRouter.get('/getReservations/:id', getReservationById);
// Delete a reservation by ID
reservationRouter.delete('/deleteReservations/:id', deleteReservation);
reservationRouter.put('/update/:id', updateReservationCancelledStatus); // New route

module.exports = reservationRouter;