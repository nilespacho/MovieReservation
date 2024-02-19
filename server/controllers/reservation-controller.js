const Reservation = require("../model/Reservation");
const mongoose = require("mongoose");

const addReservation = async (req, res) => {
  try {
    const {
      reservation_id,
      mov_ID,
      airing_time,
      seats,
      total_price,
      is_cancelled,
    } = req.body;

    if (
      !mongoose.isValidObjectId(mov_ID) ||
      !mongoose.isValidObjectId(airing_time)
    ) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid mov_ID or airing_time" });
    }

    if (
      !Array.isArray(seats) ||
      seats.some((item) => typeof item !== "string")
    ) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid seat data" });
    }

    const reservation = await Reservation.create({
      reservation_id,
      mov_ID,
      airing_time,
      seats,
      total_price,
      is_cancelled,
    });

    res.json({ status: "ok", reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json({ status: "ok", reservations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    if (!mongoose.isValidObjectId(reservationId)) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid reservation ID" });
    }

    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    if (!deletedReservation) {
      return res
        .status(404)
        .json({ status: "error", error: "Reservation not found" });
    }

    res.json({ status: "ok", deletedReservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;

    if (!mongoose.isValidObjectId(reservationId)) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid reservation ID" });
    }

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res
        .status(404)
        .json({ status: "error", error: "Reservation not found" });
    }

    res.json({ status: "ok", reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

const updateReservationCancelledStatus = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const { is_cancelled } = req.body;

    if (!mongoose.isValidObjectId(reservationId)) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid reservation ID" });
    }

    if (typeof is_cancelled !== "boolean") {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid is_cancelled value" });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { is_cancelled },
      { new: true }
    );

    if (!updatedReservation) {
      return res
        .status(404)
        .json({ status: "error", error: "Reservation not found" });
    }

    res.json({ status: "ok", updatedReservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

module.exports = {
  addReservation,
  getReservations,
  deleteReservation,
  getReservationById,
  updateReservationCancelledStatus,
};
