import React, { useState } from 'react';
import '../stylesheets/MovieSelected.css';

<<<<<<< HEAD
export const MovieSelected = () => {
    const REGPRICE = 350;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showCheckOutModal, setShowCheckOutModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [showSeniorModal, setShowSeniorModal] = useState(false);
    const [seniorCount, setSeniorCount] = useState(0);

    const handleSeatClick = (seat) => {
      const index = selectedSeats.indexOf(seat);
      if (index === -1) 
      {
        setSelectedSeats([...selectedSeats, seat]);
        setTotal(total + REGPRICE); 
        console.log(seat);
      } 
      else 
      {
        const updatedSeats = [...selectedSeats];
        updatedSeats.splice(index, 1);
        setSelectedSeats(updatedSeats);
        setTotal(total - REGPRICE);
        console.log(seat);
      }
    };

    const handleTimeClick = (time) => 
    {
        setSelectedTime(time);
    };
  
    const handleSeniorClick = () => 
    {
        setShowSeniorModal(true);
    };

    const handleSeniorCountSubmit = () => 
    {
        setShowSeniorModal(false);
        if (selectedSeats.length > 0) 
        {
            const total = (selectedSeats.length - seniorCount) * REGPRICE + seniorCount * (REGPRICE * 0.8);
            setTotal(total < 0 ? 0 : total);
        } 
        else 
        {
            setTotal(0); 
        }    
    };
=======
export const MovieSelected = ({ selectedDate }) => {
  const REGPRICE = 350;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [showSeniorModal, setShowSeniorModal] = useState(false);
  const [seniorCount, setSeniorCount] = useState(0);

  const handleSeatClick = (seat) => {
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
      setTotal(total + REGPRICE);
      console.log(seat);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
      setTotal(total - REGPRICE);
      console.log(seat);
    }
  };
>>>>>>> main

  const handleTimeClick = (time) => {
    setSelectedTime(time);
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
    if (action === 'proceed') {
      // Add your logic to proceed with the checkout
      console.log('Proceeding with checkout...');
      setShowCheckOutModal(false);
    } else {
      console.log('Canceled');
      setShowCheckOutModal(false);
    }
  };

  const getMonthInWords = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <div className="seatSelection">
        {[...'HGFEDCBA'].map((row) => (
          <div key={row} className="row">
            {[...Array(5).keys()].map((col) => (
              <div
                key={`${row}${col + 1}`}
                className={`seat ${selectedSeats.includes(`${row}${col + 1}`) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(`${row}${col + 1}`)}
              >
                {row}
                {col + 1}
              </div>
            ))}
<<<<<<< HEAD
            <div className="screen">SCREEN</div>
        </div>
=======
          </div>
        ))}
        <div className="screen">SCREEN</div>
      </div>
>>>>>>> main

      <div className="rightPanel">
        <div className="dateSelected">
          <p>{selectedDate ? getMonthInWords(selectedDate) : ''}</p>
          <div className="timeSchedule">
            <div className="timeRow">
              <button className={selectedTime === '10:30 AM' ? 'selected' : ''} onClick={() => handleTimeClick('10:30 AM')}>
                10:30 AM
              </button>
              <button className={selectedTime === '01:00 PM' ? 'selected' : ''} onClick={() => handleTimeClick('01:00 PM')}>
                01:00 PM
              </button>
            </div>
            <div className="timeRow">
              <button className={selectedTime === '03:30 PM' ? 'selected' : ''} onClick={() => handleTimeClick('03:30 PM')}>
                03:30 PM
              </button>
              <button className={selectedTime === '07:00 PM' ? 'selected' : ''} onClick={() => handleTimeClick('07:00 PM')}>
                07:00 PM
              </button>
            </div>
          </div>
        </div>
        <div className='senior'>
          <button className="seniorButton" onClick={handleSeniorClick}>
            SENIOR
          </button>
        </div>

<<<<<<< HEAD
        
        {showCheckOutModal && (
        <div className="modal">
            <div className="modalContent">
            <p>Proceed?</p>
            <div className="checkoutModalButtons">
                <button className="yesButton" onClick={() => handleModalAction('proceed')}>YES</button>
                <button className="noButton" onClick={() => handleModalAction('cancel')}>NO</button>
            </div>
=======
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
>>>>>>> main
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
    </div>
<<<<<<< HEAD
    );
  };

  export default MovieSelected;
=======
  );
};

export default MovieSelected;
>>>>>>> main
