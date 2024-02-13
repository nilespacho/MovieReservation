// reservation-routes.js

const express = require('express');
const { addReservation, getReservations, deleteReservation, getReservationById } = require('../controllers/reservation-controller');

const reservationRouter = express.Router();

// Add the POST and GET endpoints
reservationRouter.post('/addReservation', addReservation);
reservationRouter.get('/getReservations', getReservations);
reservationRouter.get('/getReservations/:id', getReservationById);
// Delete a reservation by ID
reservationRouter.delete('/deleteReservations/:id', deleteReservation);

module.exports = reservationRouter;
