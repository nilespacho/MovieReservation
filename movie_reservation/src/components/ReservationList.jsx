import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ReservationList.css";
import axios from "axios";

export const ReservationList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [movieNames, setMovieNames] = useState({});
  const [airingTime, setAiringTime] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reservation/getReservations"
        );
        setReservations(response.data.reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations(); // Call the function to fetch reservations
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  useEffect(() => {
    const fetchMovieNames = async () => {
      try {
        const movieNameMap = {};
        await Promise.all(
          reservations.map(async (reservation) => {
            const response = await axios.get(
              `http://localhost:5000/api/movies/${reservation.mov_ID}`
            );
            movieNameMap[reservation.mov_ID] = response.data.movie.title;
          })
        );
        setMovieNames(movieNameMap);
      } catch (error) {
        console.error("Error fetching movie names:", error);
      }
    };

    fetchMovieNames();
  }, [reservations]); // Fetch movie names whenever reservations change

  useEffect(() => {
    const fetchAiringTime = async () => {
      try {
        const airingTimeMap = {};
        await Promise.all(
          reservations.map(async (reservation) => {
            const response = await axios.get(
              `http://localhost:5000/api/airing-time/${reservation.airing_time}`
            );
            const startTime = response.data.airingTime.startTime;
            const formattedStartTime = formatDateTime(startTime); // Format the start time
            airingTimeMap[reservation.airing_time] = formattedStartTime;
          })
        );
        setAiringTime(airingTimeMap);
      } catch (error) {
        console.error("Error fetching airing time:", error);
      }
    };

    fetchAiringTime();
  }, [reservations]); // Fetch movie names whenever reservations change

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    date.setHours(date.getHours() - 8);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours =
      date.getHours() > 12
        ? (date.getHours() - 12).toString().padStart(2, "0")
        : date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM"; // Determine if it's AM or PM

    return `${month} ${day}, ${year} ${hours}:${minutes} ${period}`;
  };

  const toggleModal = (reservationId) => {
    setSelectedReservationId(reservationId);
    setShowModal(!showModal);
  };

  const updateReservation = async (reservationId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reservation/update/${reservationId}`,
        {
          is_cancelled: true, // or false, depending on your logic
        }
      );

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId
            ? { ...reservation, is_cancelled: true }
            : reservation
        )
      );
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
    toggleModal(null); // Close modal after updating
  };

  return (
    <div className="container">
      <button className="goBackButton" onClick={() => navigate("/")}>
        GO BACK
      </button>
      <div className="titleContainer">
        <h3 className="title">Reservation List</h3>
      </div>
      <ul className="listContainer">
        {reservations.map((reservation) => (
          <div key={reservation._id}>
            {reservation.is_cancelled ? null : (
              <li className="list">
                ID: {reservation.reservation_id} <br />
                Movie Name: {movieNames[reservation.mov_ID]} <br />
                Airing Date and Time: {airingTime[reservation.airing_time]}{" "}
                <br />
                Seats: {reservation.seats.join(", ")} <br />
                <button
                  className="deleteButton"
                  onClick={() => toggleModal(reservation._id)}
                >
                  Cancel
                </button>
              </li>
            )}
          </div>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p className="deleteStatement">
              Are you sure you want to update this reservation?
            </p>
            <div className="deleteModalButton">
              <button
                className="yesButton"
                onClick={() => updateReservation(selectedReservationId)}
              >
                Yes
              </button>
              <button className="noButton" onClick={() => toggleModal(null)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
