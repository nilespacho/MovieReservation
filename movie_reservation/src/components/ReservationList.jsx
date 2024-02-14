import React, { useState, useEffect } from 'react';
import '../stylesheets/ReservationList.css';
import axios from 'axios';

export const ReservationList = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [movieNames, setMovieNames] = useState({});
    const [airingTime, setAiringTime] = useState({});

    useEffect(() => {
        // Fetch reservations data when component mounts
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reservation/getReservations');
                // Update reservations state with fetched reservations
                setReservations(response.data.reservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations(); // Call the function to fetch reservations
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    useEffect(() => {
        const fetchMovieNames = async () => {
            try {
                const movieNameMap = {};
                // Fetch movie names based on mov_IDs
                await Promise.all(reservations.map(async reservation => {
                    const response = await axios.get(`http://localhost:5000/api/movies/${reservation.mov_ID}`);
                    movieNameMap[reservation.mov_ID] = response.data.movie.title;
                }));
                setMovieNames(movieNameMap);
            } catch (error) {
                console.error('Error fetching movie names:', error);
            }
        };

        fetchMovieNames();
    }, [reservations]); // Fetch movie names whenever reservations change

    useEffect(() => {
        const fetchAiringTime = async () => {
            try {
                const airingTimeMap = {};
                await Promise.all(reservations.map(async reservation => {
                    const response = await axios.get(`http://localhost:5000/api/airing-time/${reservation.airing_time}`);
                    const startTime = response.data.airingTime.startTime;
                    const formattedStartTime = formatDateTime(startTime); // Format the start time
                    airingTimeMap[reservation.airing_time] = formattedStartTime;
                }));
                setAiringTime(airingTimeMap);
            } catch (error) {
                console.error('Error fetching airing time:', error);
            }
        };

        fetchAiringTime();
    }, [reservations]); // Fetch movie names whenever reservations change

    useEffect(() => {
        const fetchAiringTime = async () => {
            try {
                const airingTimeMap = {};
                await Promise.all(reservations.map(async reservation => {
                    const response = await axios.get(`http://localhost:5000/api/airing-time/${reservation.airing_time}`);
                    const startTime = response.data.airingTime.startTime;
                    const formattedStartTime = formatDateTime(startTime); // Format the start time
                    airingTimeMap[reservation.airing_time] = formattedStartTime;
                }));
                setAiringTime(airingTimeMap);
            } catch (error) {
                console.error('Error fetching airing time:', error);
            }
        };

        fetchAiringTime();
    }, [reservations]); // Fetch movie names whenever reservations change


    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };
    
    const toggleModal = (reservationId) => {
        setSelectedReservationId(reservationId);
        setShowModal(!showModal);
    };

    const updateReservation = async (reservationId) => {
        try {
            // Make PUT request to update the reservation's is_cancelled status
            await axios.put(`http://localhost:5000/api/reservation/update/${reservationId}`, {
                is_cancelled: true // or false, depending on your logic
            });
    
            // Optionally, you can refetch the reservations or update the local state
    
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
        toggleModal(null); // Close modal after updating
    };
    

    return (
        <div className='container'>
            <div className='titleContainer'>
                <h3 className='title'>Reservation List</h3>
            </div>
            <ul className='listContainer'>
                {reservations.map(reservation => (
                    <div key={reservation._id}>
                        <li className='list'>
                            ID: {reservation._id} <br />
                            Movie Name: {movieNames[reservation.mov_ID]} <br />
                            Airing Time: {airingTime[reservation.airing_time]} <br />
                            Seats: {reservation.seats.join(', ')} <br />
                            {/* Total Price: {reservation.total_price} <br /> */}
                            Is Cancelled: {reservation.is_cancelled ? 'Yes' : 'No'} <br />
                            <button className='deleteButton' onClick={() => toggleModal(reservation._id)}>Update</button>

                        </li>
                    </div>
                ))}
            </ul>

            {showModal && (
                <div className='modal'>
                    <div className='modalContent'>
                    <p className='deleteStatement'>Are you sure you want to update this reservation?</p>
                        <div className='deleteModalButton'>
                            <button className="yesButton" onClick={() => updateReservation(selectedReservationId)}>Yes</button>
                            <button className="noButton" onClick={() => toggleModal(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationList;
