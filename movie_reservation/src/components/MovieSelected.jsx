import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../stylesheets/MovieSelected.css";
import axios from "axios";

export const MovieSelected = ({}) => {
  const navigate = useNavigate();
  const REGPRICE = 350;
  const PREMIERPRICE = 500;
  const [movie, setMovie] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  let [selectedTime, setSelectedTime] = useState("");
  let selectedTimeId;
  let [reservedTime, setReservedTime] = useState([]);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [showSeniorModal, setShowSeniorModal] = useState(false);
  const [seniorCount, setSeniorCount] = useState(0);
  const [airingTime, setAiringTime] = useState([]);
  let time;
  const [formattedAiringTime, setFormattedAiringTime] = useState([]);
  const location = useLocation();
  const [movieId, setMovieId] = useState(null);

  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [premierCheck, setPremierCheck] = useState(false);
  const [premierDate, setPremierDate] = useState(null);
  const [dateClicked, setDateClicked] = useState(false);
  const [showCheckoutModalGoBack, setShowCheckoutModalGoBack] = useState(false);
  const [showResponse, setShowResponse] = useState([]);
  const [showNoSelectedCheckout, setShowNoSelectedCheckout] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate")
  );

  useEffect(() => {
    if (location.state?.movieId) {
      setMovieId(location.state.movieId);
      console.log(`MovieID ${location.state.movieId}`);
    }
  }, [location.state]);

  useEffect(() => {
    setSelectedDate(localStorage.getItem("selectedDate"));
    console.log(`selectedDate: ${selectedDate}`);
  }, []);

  useEffect(() => {
    const fetchAiringTime = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/airing-time"
        );
        const allAiringTimes = response.data.airingTimes;
        const selectedDateTimes = allAiringTimes.filter((time) => {
          const date = new Date(time.startTime);
          const formattedDate = date.toLocaleDateString(undefined, {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
          });
          return formattedDate === getMonthInWords(selectedDate);
        });

        const formattedStartTimeArray = selectedDateTimes.map((time) => ({
          _id: time._id,
          formattedTime: new Date(time.startTime).toLocaleTimeString(
            undefined,
            {
              timeZone: "UTC",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          ),
        }));

        setAiringTime(selectedDateTimes);
        setFormattedAiringTime(formattedStartTimeArray);
      } catch (error) {
        console.error("Error fetching airing times:", error);
      }
    };

    fetchAiringTime();
  }, [selectedDate]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        console.log("Fetching reservations...");
        const response = await axios.get(
          "http://localhost:5000/api/reservation/getReservations"
        );
        setReservedTime(response.data.reservations);
        console.log("Reserved Time:", response.data.reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleTimeClick = async (time) => {
    setSelectedSeats([]);
    setTotal(0);
    setSelectedTime(time);
    selectedTimeId = time;
    setDateClicked(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/${movieId}`
      );
      if (response.data && response.data.movie) {
        const movieObject = response.data.movie; // Directly access the movie object
        const premierDateCheck = movieObject ? movieObject.premiereDate : null;
        const premierConvertedTime = movieObject
          ? new Date(movieObject.premiereDate).toLocaleDateString("en-US")
          : null;
        const parsedDate = new Date(selectedDate);
        const selectedDateFormatted = parsedDate.toLocaleDateString("en-US");

        console.log(`selectedDate: ${selectedDate}`);
        console.log(`premiereDate: ${premierDate}`);
        console.log(`premiereDateCheck: ${premierDateCheck}`);
        console.log(`selectedDate: ${selectedDateFormatted}`);

        if (
          premierDate &&
          premierDateCheck &&
          selectedDateFormatted &&
          premierConvertedTime
        ) {
          if (movieObject.airing_time === selectedTimeId) {
            console.error("Premier set true");
            setPremierCheck(true);
          } else {
            console.error("Premier set false");
            setPremierCheck(false);
          }
        } else {
          console.error("Premier set false");
          setPremierCheck(false);
        }
      } else {
        console.error("Error: No movie data found in the response");
      }
      setDateClicked(true);
    } catch (error) {
      console.error("Error fetching premiere date:", error);
    }

    const isReserved = reservedTime.some(
      (reservation) =>
        reservation.airing_time === selectedTimeId &&
        reservation.mov_ID === movieId
    );

    console.log("All Reservations:", reservedTime);

    if (isReserved) {
      console.log(`Reserved Time: ${reservedTime}`);
    } else {
      console.log("This time is not reserved for the selected movie");
    }
  };

  const getPremierDate = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/${movieId}`
      );
      setMovie(response.data.movie);
      const movieObject = response.data.movie;
      return movieObject ? movieObject.premiereDate : null;
    } catch (error) {
      console.error(
        `Error fetching premiere date for movie ${movieId}:`,
        error
      );
      return null;
    }
  };

  useEffect(() => {
    if (movieId) {
      const fetchPremierDate = async () => {
        try {
          const premierDate = await getPremierDate(movieId);
          setPremierDate(premierDate);
        } catch (error) {
          console.error("Error fetching premier date:", error);
        }
      };

      fetchPremierDate();
    }
  }, [movieId]);

  const handleSeatClick = (seat) => {
    if (!selectedTime) {
      setDateClicked(true);
      return;
    }

    const pricePerSeat = premierCheck ? PREMIERPRICE : REGPRICE;
    const isAlreadySelected = selectedSeats.includes(seat);
    const newSelectedSeats = isAlreadySelected
      ? selectedSeats.filter((selectedSeat) => selectedSeat !== seat) // Remove the seat if it's already selected
      : [...selectedSeats, seat]; // Add the seat if it's not already selected

    let totalWithDiscount;

    if (premierCheck) {
      totalWithDiscount = newSelectedSeats.length * pricePerSeat;
    } else {
      const seatsAfterDiscount = Math.max(
        newSelectedSeats.length - seniorCount,
        0
      );
      totalWithDiscount =
        seatsAfterDiscount * pricePerSeat +
        Math.min(newSelectedSeats.length, seniorCount) * (pricePerSeat * 0.8);
    }

    setSelectedSeats(newSelectedSeats);
    setTotal(totalWithDiscount);
  };

  const handleSeniorClick = () => {
    setShowSeniorModal(true);
  };

  const handleSeniorCountSubmit = () => {
    setShowSeniorModal(false);
    if (selectedSeats.length > 0 && selectedSeats.length >= seniorCount) {
      const total =
        (selectedSeats.length - seniorCount) * REGPRICE +
        seniorCount * (REGPRICE * 0.8);
      setTotal(total < 0 ? 0 : total);
    } else {
      return;
    }
  };

  const handleCheckoutClick = (action) => {
    if (action === "checkout") {
      if (selectedSeats.length !== 0 && selectedTime !== null) {
        setShowCheckOutModal(true);
      } else {
        setShowNoSelectedCheckout(true);
      }
    } else if (action === "home") {
      setShowCheckoutModalGoBack(true);
    }
  };

  function generateUniqueReservationId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000000); // Generate a random number between 0 and 999999999
    const reservationId = timestamp.toString() + random.toString();
    return reservationId.substring(0, 10); // Return the first 10 characters of the generated ID
  }

  const handleModalAction = (action) => {
    const reservationId = generateUniqueReservationId(); // Implement this function
    const reservationData = {
      reservation_id: reservationId,
      mov_ID: movieId,
      airing_time: selectedTime,
      seats: selectedSeats,
      total_price: total,
      is_cancelled: false,
    };

    if (action === "proceed") {
      if (selectedTime && selectedSeats.length > 0) {
        console.log("Proceeding with checkout...");
        axios
          .post(
            "http://localhost:5000/api/reservation/addReservation",
            reservationData
          )
          .then((response) => {
            setShowResponse(response.data);
            console.log("Reservation added successfully:", response.data);
            setShowCheckOutModal(false);
            setShowCountdownModal(true);
            setTimeout(() => {
              setShowCountdownModal(false);
              navigate("/");
            }, 3000);
          })
          .catch((error) => {
            console.error("Error adding reservation:", error);
          });
      }
    } else {
      console.log("Canceled");
      setShowCheckOutModal(false);
    }

    setDateClicked(false);
  };

  const getMonthInWords = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    time = date.toLocaleDateString(undefined, options);
    return time;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Formatting hours and minutes to display with leading zeros if needed
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Returning the current time in "hh:mm" format
    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="containers">
      <div className="leftPanel">
        <div className="dateSelected">
          <p>{selectedDate ? getMonthInWords(selectedDate) : ""}</p>
          <div className="timeSchedule">
            {formattedAiringTime.map((time) => (
              <div key={time._id} className="timeRow">
                {getCurrentTime() < time.formattedTime ? (
                  <button
                    key={time._id}
                    className={selectedTime === time._id ? "selected" : ""}
                    onClick={() => handleTimeClick(time._id)}
                  >
                    {time.formattedTime}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {!premierCheck && (
          <div className="senior">
            <button className="seniorButton" onClick={handleSeniorClick}>
              SENIOR
            </button>
          </div>
        )}
      </div>
      <div className="seatSelection">
        {[..."HGFEDCBA"].map((row) => (
          <div key={row} className="row">
            {[...Array(5).keys()].map((col) => {
              const seatId = `${row}${col + 1}`;
              const isReserved =
                selectedTime &&
                reservedTime.some(
                  (reservation) =>
                    reservation.airing_time === selectedTime &&
                    reservation.mov_ID === movieId &&
                    reservation.seats.includes(seatId) &&
                    !reservation.is_cancelled // Check if reservation is not cancelled
                );

              return (
                <div
                  key={`${row}${col + 1}`}
                  className={`seat ${
                    selectedSeats.includes(seatId) ? "selected" : ""
                  } ${isReserved ? "reserved" : ""}`}
                  onClick={() => !isReserved && handleSeatClick(seatId)} // Disable click if reserved
                >
                  {row}
                  {col + 1}
                </div>
              );
            })}
          </div>
        ))}
        <div className="screen">SCREEN</div>
      </div>
      <div className="rightPanelContainer">
        <div className="textContainer">
          <h1>{movie.title}</h1>
        </div>

        <div className="rightPanel">
          <div className="summary">
            <p>
              Ticket:{" "}
              <span className="summaryDetails">x{selectedSeats.length}</span>
            </p>
            <p>
              Total: <span className="summaryDetails">{total}</span>
            </p>
          </div>
        </div>
        <div className="buttonPanel">
          <button
            className="checkoutButton"
            onClick={() => handleCheckoutClick("checkout")}
          >
            CHECKOUT
          </button>
          <button
            className="goBackButton"
            onClick={() => handleCheckoutClick("home")}
          >
            GO BACK
          </button>
        </div>
      </div>
      {showCheckOutModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Please select both time and seats before checking out.</p>
            <div className="checkoutModalButtons">
              <button
                className="okButton"
                onClick={() => setShowCheckOutModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showCheckOutModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Proceed?</p>
            <div className="checkoutModalButtons">
              <button
                className="yesButton"
                onClick={() => handleModalAction("proceed")}
              >
                YES
              </button>
              <button
                className="noButton"
                onClick={() => handleModalAction("cancel")}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
      {showSeniorModal && (
        <div className="modal">
          <div className="modalContent">
            <p className="seniorNumber">Number of seniors:</p>
            <input
              className="seniorInput"
              type="number"
              value={seniorCount}
              onChange={(e) => setSeniorCount(parseInt(e.target.value))}
              min="0"
              max={selectedSeats.length}
            />
            <div className="seniorModalButton">
              <button
                className="submitButton"
                onClick={handleSeniorCountSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showCountdownModal && (
        <div className="modal">
          <div className="modalContent">
            <p>
              Your Reservation Id is: {showResponse.reservation.reservation_id}
            </p>
            <p>Returning to HomeScreen in 3 seconds...</p>
          </div>
        </div>
      )}
      {dateClicked && !selectedTime && (
        <div className="modal">
          <div className="modalContent">
            <p>Please select a time schedule first!</p>
            <div className="checkoutModalButtons">
              <button
                className="noButton"
                onClick={() => setDateClicked(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
      {showNoSelectedCheckout && (
        <div className="modal">
          <div className="modalContent">
            <p>Select your schedule and seat first</p>
            <div className="checkoutModalButtons">
              <button
                className="noButton"
                onClick={() => setShowNoSelectedCheckout(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
      {/* modal for going back to homepage */}
      {showCheckoutModalGoBack && (
        <div className="modal">
          <div className="modalContent">
            <p>Are you sure you want to go back to the homescreen?</p>
            <div className="checkoutModalButtons">
              <button className="yesButton" onClick={() => navigate("/")}>
                YES
              </button>
              <button
                className="noButton"
                onClick={() => setShowCheckoutModalGoBack(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSelected;
