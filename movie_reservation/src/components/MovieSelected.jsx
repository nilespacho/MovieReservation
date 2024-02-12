import React, { useState } from 'react'
import '../stylesheets/MovieSelected.css';

export const MovieSelected = () => {
    const REGPRICE = 350;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isSeniorSelected, setIsSeniorSelected] = useState(false);
    const [showCheckOutModal, setShowCheckOutModal] = useState(false);
    const [total, setTotal] = useState(0);
  
    const handleSeatClick = (seat) => {
      const index = selectedSeats.indexOf(seat);
      if (index === -1) 
      {
        setSelectedSeats([...selectedSeats, seat]);
        setTotal(total + REGPRICE); 
      } 
      else 
      {
        const updatedSeats = [...selectedSeats];
        updatedSeats.splice(index, 1);
        setSelectedSeats(updatedSeats);
        setTotal(total - REGPRICE);
      }
    };

    const handleTimeClick = (time) => 
    {
        setSelectedTime(time);
    };
  
    const handleSeniorClick = () => 
    {
        setIsSeniorSelected(!isSeniorSelected);
        if (!isSeniorSelected) 
        {
            setTotal(total * 0.8); // Applying 20% discount
        } else 
        {
            setTotal(total / 0.8); // Removing 20% discount
        }
    };

    const handleCheckoutClick = () => 
    {
        setShowCheckOutModal(true);
    };
  
    const handleModalAction = (action) => 
    {
        if (action === 'proceed') 
        {
          // Add your logic to proceed with the checkout
          console.log('Proceeding with checkout...');
          setShowCheckOutModal(false);
        }
        else
        {
            console.log('Canceled')
            setShowCheckOutModal(false); 
        }
        
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
            </div>
            ))}
        <div className="screen">SCREEN</div>
    </div>

        <div className="rightPanel">
            <div className="dateSelected">
                <p>February 9, 2024</p>
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
          <div className="modal-content">
            <p>Proceed?</p>
            <div className="modal-buttons">
              <button className="yesButton" onClick={() => handleModalAction('proceed')}>YES</button>
              <button className="noButton" onClick={() => handleModalAction('cancel')}>NO</button>
            </div>
          </div>
        </div>
      )}

    </div>
    );
  };
  
  export default MovieSelected;