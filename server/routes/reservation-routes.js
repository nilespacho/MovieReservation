// reservation-routes.js

const express = require('express');
const { addReservation, getReservations } = require('../controllers/reservation-controller');

const reservationRouter = express.Router();

// Add the POST and GET endpoints
reservationRouter.post('/addReservation', addReservation);
reservationRouter.get('/getReservations', getReservations);

module.exports = reservationRouter;
