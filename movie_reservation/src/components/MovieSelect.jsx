import React, { useState, useEffect } from 'react';
import '../stylesheets/MovieSelect.css'; // Import the CSS file
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate hooks

const cinemasData = [
  { id: 1, name: 'Cinema 1' },
  { id: 2, name: 'Cinema 2' },
  { id: 3, name: 'Cinema 3' },
  { id: 4, name: 'Cinema 4' },
];

const MovieSelect = ({ selectedDate, onSelectedDate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then((response) => setMovies(response.data))
      .catch((err) => console.log(err));

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleMovieClick = (movieId, premiereDate, isPremier) => {
    const currentDate = new Date(selectedDate);
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight
  
    // Convert premiereDate to 'Asia/Manila' timezone and set time to midnight
    const premiereDateTime = new Date(premiereDate);
    premiereDateTime.setHours(0, 0, 0, 0);
  
    console.log(`the selected date: ${currentDate}`);
    console.log(`the premiere date: ${premiereDateTime}`);
  
    // Check if the movie is a premiere and if the selectedDate is on or after the premiereDate
    if (!isPremier || (isPremier && currentDate >= premiereDateTime)) {
      navigate(`/niles/${movieId}`, { state: { movieId } });
    }
    // Optionally, you can show a message or take other actions if the conditions are not met
  };
  

  useEffect(() => {
    if (location.state?.selectedDay) {
      onSelectedDate(location.state.selectedDay.date);
    }
  }, [location.state, onSelectedDate]);

  return (
    <div>
      <div className="date-time">
        <h2 className="current-time">{currentTime.toLocaleTimeString()}</h2>
      </div>
      <div className="movieSelect">
      <div className="movie-grid">
      {movies.movies &&
  movies.movies.map((movie, index) => (
    <div key={movie._id} className="movie-item">
      <div className="cinema-data">{cinemasData[index].name}</div>
      <img
        src={movie.poster}
        alt={movie.title}
        onClick={() => handleMovieClick(movie._id, movie.premiereDate, movie.is_premier)}
        className={movie.is_premier ? (new Date(selectedDate) < new Date(movie.premiereDate) ? 'not-clickable' : '') : ''}
      />
      <div className="movie-info">
        <h2>{movie.title}</h2>
      </div>
    </div>
  ))}

      </div>
      <div className="date">
        <h1>{selectedDate ? getMonthInWords(selectedDate) : ''}</h1> 
      </div>
    </div>
  );
};

const getMonthInWords = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

export default MovieSelect;
