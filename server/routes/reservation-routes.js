const express = require('express'); // Import express correctly
const { addReservation } = require('../controllers/reservation-controller');

const reservationRouter = express.Router();

reservationRouter.post('/', addReservation); // Use the correct function name

module.exports = reservationRouter;
