import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../stylesheets/MovieSelected.css';
import axios from 'axios';

export const MovieSelected = ({ selectedDate }) => {
  const navigate = useNavigate();
  const REGPRICE = 350;
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
  


  
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    selectedTimeId = time;
  
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
  
  
  



  

  const handleSeatClick = (seat) => {
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
      setTotal(total + REGPRICE);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
      setTotal(total - REGPRICE);
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
    setShowCheckOutModal(true);
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
    // Add your logic to proceed with the checkout
    console.log('Proceeding with checkout...');
    axios.post('http://localhost:5000/api/reservation/addReservation', reservationData)
      .then(response => {
        console.log('Reservation added successfully:', response.data);
        // Add any additional logic you need after successful reservation

        // Show the countdown modal
        setShowCountdownModal(true);

        // Set a timeout to close the countdown modal and navigate after 2 seconds
        setTimeout(() => {
          setShowCountdownModal(false);
          setShowCheckOutModal(false);
          
          // Navigate to the home page ('/') after 2 seconds
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        console.error('Error adding reservation:', error);
        // Handle errors here
      });
  } else {
    console.log('Canceled');
    setShowCheckOutModal(false);
  }
  };
  

  // const handleModalAction = (action) => {
  //   if (action === 'proceed') {
  //     // Add your logic to proceed with the checkout
  //     console.log('Proceeding with checkout...');
  //     useEffect(() =>{
        
  //     })

  //     setShowCheckOutModal(false);
  //   } else {
  //     console.log('Canceled');
  //     setShowCheckOutModal(false);
  //   }
  // };

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


              {/* {console.log(formattedAiringTime)} */}
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

        <div className='senior'>
          <button className="seniorButton" onClick={handleSeniorClick}>
            SENIOR
          </button>
        </div>

        <div className="summary">
          <p>Name Movie: <span className='summaryDetails'>x{selectedSeats.length}</span></p>
          <p>Total: <span className='summaryDetails'>{total}</span></p>
        </div>
        <button className="checkoutButton" onClick={handleCheckoutClick}>
          CHECKOUT
        </button>
        <button className="goBackButton">GO BACK</button>
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
        <div className="countdown-modal">
          <p>Reservation successful!</p>
          <p>Redirecting in 2 seconds...</p>
        </div>
      )}
    </div>
  );
};

export default MovieSelected;



