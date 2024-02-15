import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../stylesheets/MovieSelected.css';
import axios from 'axios';

export const MovieSelected = ({ selectedDate }) => {
  const navigate = useNavigate()
  const REGPRICE = 350;
  const PREMIERPRICE = 500
  const [selectedSeats, setSelectedSeats] = useState([]);
  let [selectedTime, setSelectedTime] = useState('');
  let selectedTimeId
  // let reservedTime
  let [reservedTime, setReservedTime] = useState([]);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [showSeniorModal, setShowSeniorModal] = useState(false);
  const [seniorCount, setSeniorCount] = useState(0);
  const [airingTime, setAiringTime] = useState([]);
  let time;
  const [formattedAiringTime, setFormattedAiringTime] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const location = useLocation();
  const [movieId, setMovieId] = useState(null);

  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [premierCheck, setPremierCheck] = useState(false);
  const [premierDate, setPremierDate] = useState(null);
  const [dateClicked, setDateClicked] = useState(false);
  const [seatClicked, setSeatClicked] = useState(false)
  
  
  useEffect(() => {
    if (location.state?.movieId) {
      // Access the movieId from the state and set it using setMovieId
      setMovieId(location.state.movieId);
      console.log(`MovieID ${location.state.movieId}`);
    }
  }, [location.state]);



  useEffect(() => {
    // console.log('Fetching airing times for selected date:', selectedDate);
  
    const fetchAiringTime = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/airing-time');
        const allAiringTimes = response.data.airingTimes;
  
        // Filter airing times based on selectedDate
        const selectedDateTimes = allAiringTimes.filter((time) => {
          const date = new Date(time.startTime);
          const formattedDate = date.toLocaleDateString(undefined, { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
          return formattedDate === getMonthInWords(selectedDate);
        });
  
        // Extract both _id and formatted start times
        const formattedStartTimeArray = selectedDateTimes.map((time) => ({
          _id: time._id,
          formattedTime: new Date(time.startTime).toLocaleTimeString(undefined, { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true }),
        }));
  
        setAiringTime(selectedDateTimes);
        setFormattedAiringTime(formattedStartTimeArray);
      } catch (error) {
        console.error('Error fetching airing times:', error);
      }
    };
  
    fetchAiringTime();
  }, [selectedDate]);
  

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        console.log('Fetching reservations...');
        const response = await axios.get('http://localhost:5000/api/reservation/getReservations');
        // Update reservations state with fetched reservations
        setReservedTime(response.data.reservations);
        console.log('Reserved Time:', response.data.reservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
  
    fetchReservations();
  }, []);
  

  const handleTimeClick = async (time) => {
    setSelectedTime(time);
    selectedTimeId = time;
  
    // Fetch the premiere date after clicking a time
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
      if (response.data && response.data.movie) {
        const movie = response.data.movie; // Directly access the movie object
        const premierDateCheck = movie ? movie.premiereDate : null;
        const premierConvertedTime = movie ? new Date(movie.premiereDate).toLocaleDateString('en-US') : null;
        const selectedDateFormatted = selectedDate.toLocaleDateString('en-US');
        
        console.log(`premiereDate: ${premierDate}`);
        console.log(`premiereDateCheck: ${premierDateCheck}`);
        console.log(`selectedDate: ${selectedDateFormatted}`);
        
        // Check if the movie is a premier and if selectedDate matches the premierDate of the movie
        if ((premierDate && premierDateCheck) && (selectedDateFormatted && premierConvertedTime)) {
          if(movie.airing_time === selectedTimeId) {
            // If the movie is a premier and selectedDate matches the premierDate, set premierCheck flag to true
          console.error('Premier set true');
          setPremierCheck(true);
          } else {
            console.error('Premier set false');
          setPremierCheck(false);
          }
        } else {
          // If not a premier or selectedDate doesn't match, set premierCheck flag to false
          console.error('Premier set false');
          setPremierCheck(false);
        }
      } else {
        console.error('Error: No movie data found in the response');
      }
      setDateClicked(true);
    } catch (error) {
      console.error('Error fetching premiere date:', error);
      // Handle errors appropriately
    }
  
    // Check if the clicked time exists in the reservations for the same movie
    const isReserved = reservedTime.some(reservation => 
      reservation.airing_time === selectedTimeId && reservation.mov_ID === movieId
    );
  
    console.log('All Reservations:', reservedTime);
  
    if (isReserved) {
      console.log(`Reserved Time: ${reservedTime}`);
    } else {
      console.log('This time is not reserved for the selected movie');
    }
  };
  
  

  const getPremierDate = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
      const movie = response.data.movie
      return movie ? movie.premiereDate : null;
    } catch (error) {
      console.error(`Error fetching premiere date for movie ${movieId}:`, error);
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
          console.error('Error fetching premier date:', error);
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

    setSeatClicked(true)
    // Determine the price based on whether the movie is premier
    const pricePerSeat = premierCheck ? PREMIERPRICE : REGPRICE;
  
    if (selectedReservation) {
      // If a matching reservation is found
      const reservationSeats = selectedReservation.seats;
  
      if (reservationSeats.includes(seat)) {
        // If the clicked seat is in the reservation, do nothing
        return;
      }
    }
  
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
      setTotal(total + pricePerSeat);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
      setTotal(total - pricePerSeat);
    }
  };
  

  const handleSeniorClick = () => {
    setShowSeniorModal(true);
  };

  const handleSeniorCountSubmit = () => {
    setShowSeniorModal(false);
    if (selectedSeats.length > 0) {
      const total = (selectedSeats.length - seniorCount) * REGPRICE + seniorCount * (REGPRICE * 0.8);
      setTotal(total < 0 ? 0 : total);
    } else {
      setTotal(0);
    }
  };

  const handleCheckoutClick = () => {
    if (!selectedTime && selectedSeats.length === 0) {
      setShowCheckOutModal(true);
    } else {
      setShowCheckOutModal(true);
    }
  };

  const handleModalAction = (action) => {
    // Prepare the reservation data
    const reservationData = {
      mov_ID: movieId,
      airing_time: selectedTime,
      seats: selectedSeats,
      total_price: total,
      is_cancelled: false,
    };
  
    if (action === 'proceed') {

      if (selectedTime && selectedSeats.length > 0) {
        // Add your logic to proceed with the checkout
      console.log('Proceeding with checkout...');
      axios.post('http://localhost:5000/api/reservation/addReservation', reservationData)
        .then(response => {
          console.log('Reservation added successfully:', response.data);
          // Add any additional logic you need after successful reservation
          setShowCheckOutModal(false);
          // Show the countdown modal
          setShowCountdownModal(true);
          
  
          // Set a timeout to close the countdown modal and navigate after 2 seconds
          setTimeout(() => {
            setShowCountdownModal(false);
            
            // Navigate to the home page ('/') after 2 seconds
            navigate('/');
          }, 2000);
        })
        .catch(error => {
          console.error('Error adding reservation:', error);
          // Handle errors here
        });
      }
    } else {
      console.log('Canceled');
      setShowCheckOutModal(false);
    }

    setDateClicked(false);
  };

  const getMonthInWords = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    time = date.toLocaleDateString(undefined, options);
    return time;
  };



  

  

  return (
    <div className="container">
      <div className="seatSelection">
  {[...'HGFEDCBA'].map((row) => (
    <div key={row} className="row">
      {[...Array(5).keys()].map((col) => {
        const seatId = `${row}${col + 1}`;
        const isReserved = selectedTime && reservedTime.some((reservation) => 
  reservation.airing_time === selectedTime && reservation.mov_ID === movieId && reservation.seats.includes(seatId)
);


        return (
          <div
            key={`${row}${col + 1}`}
            className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''} ${isReserved ? 'reserved' : ''}`}
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


              {/* {console.log(`selectedDate: ${selectedDate}`)}
              {console.log(`FormattedDate: ${formattedAiringTime}`)} */}
      <div className="rightPanel">
        <div className="dateSelected">
          <p>{selectedDate ? getMonthInWords(selectedDate) : ''}</p>
          <div className="timeSchedule">
            {formattedAiringTime.map((time) => (
              <div key={time._id} className="timeRow">
                <button className={selectedTime === time._id ? 'selected' : ''} onClick={() => handleTimeClick(time._id)}>
                  {time.formattedTime}
                </button>
              </div>
            ))}
          </div>
        </div>


        {/* <div className='senior'>
          <button className="seniorButton" onClick={handleSeniorClick}>
            SENIOR
          </button>
        </div> */}

      {console.log(`selectedDate: ${premierDate}`)}
      {!premierCheck && (
  <div className='senior'>
    <button className="seniorButton" onClick={handleSeniorClick}>
      SENIOR
    </button>
  </div>
)}


        <div className="summary">
          <p>Name Movie: <span className='summaryDetails'>x{selectedSeats.length}</span></p>
          <p>Total: <span className='summaryDetails'>{total}</span></p>
        </div>
        <button className="checkoutButton" onClick={handleCheckoutClick}>
          CHECKOUT
        </button>
        <button className="goBackButton">GO BACK</button>
      </div>

        <div className="modal">
          <div className="modalContent">
            <p>Please select both time and seats before checking out.</p>
            <div className="checkoutModalButtons">
              <button className="okButton" onClick={() => setShowCheckOutModal(false)}>OK</button>
            </div>
          </div>
        </div>


      {showCheckOutModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Proceed?</p>
            <div className="checkoutModalButtons">
              <button className="yesButton" onClick={() => handleModalAction('proceed')}>YES</button>
              <button className="noButton" onClick={() => handleModalAction('cancel')}>NO</button>
            </div>
          </div>
        </div>
      )}

      {showSeniorModal && (
        <div className="modal">
          <div className="modalContent">
            <p className='seniorNumber'>Number of seniors:</p>
            <input
              className='seniorInput'
              type="number"
              value={seniorCount}
              onChange={(e) => setSeniorCount(parseInt(e.target.value))}
              min="0"
            />
            <div className="seniorModalButton">
              <button className="submitButton" onClick={handleSeniorCountSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Countdown modal */}

      {showCountdownModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Reservation successful!</p>
            <p>Redirecting in 2 seconds...</p>
          </div>
        </div>
      )}

      {/* Time Not Selected Modal */}
      {dateClicked && (
        <div className="modal">
          <div className="modalContent">
            <p>Please select a time schedule first!</p>
            <div className="checkoutModalButtons">
            <button className="noButton" onClick={() => setDateClicked(false)}>
              CLOSE
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSelected;



