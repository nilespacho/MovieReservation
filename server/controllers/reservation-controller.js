const Reservation = require("../model/Reservation");
const express = require("express");
const mongoose = require("mongoose");

// Define your controller handler function for adding a reservation
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

// Define your controller handler function for getting all reservations
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

const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        // Check if the reservationId is a valid ObjectId
        if (!mongoose.isValidObjectId(reservationId)) {
            return res.status(400).json({ status: 'error', error: 'Invalid reservation ID' });
        }

        // Find and delete the reservation
        const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

        if (!deletedReservation) {
            return res.status(404).json({ status: 'error', error: 'Reservation not found' });
        }

        res.json({ status: 'ok', deletedReservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
}

const getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;

        // Check if the reservationId is a valid ObjectId
        if (!mongoose.isValidObjectId(reservationId)) {
            return res.status(400).json({ status: 'error', error: 'Invalid reservation ID' });
        }

        // Find the reservation by ID
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ status: 'error', error: 'Reservation not found' });
        }

        res.json({ status: 'ok', reservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
};

// Export the named functions
module.exports = {
    addReservation,
    getReservations,
    deleteReservation,
    getReservationById,
}

