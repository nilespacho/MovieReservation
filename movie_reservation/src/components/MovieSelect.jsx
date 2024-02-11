import React, { useState, useEffect } from 'react';
import '../stylesheets/MovieSelect.css';

const cinemasData = [
  { id: 1, name: 'Cinema 1' },
  { id: 2, name: 'Cinema 2' },
  { id: 3, name: 'Cinema 3' },
  { id: 4, name: 'Cinema 4' },
];

const moviesData = [
  { id: 1, title: 'The Shawshank Redemption', poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
  { id: 2, title: 'The Godfather', poster: 'https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg' },
  { id: 3, title: 'The Dark Knight', poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg' },
  { id: 4, title: 'Alita', poster: 'https://image.tmdb.org/t/p/w500/xRWht48C2V8XNfzvPehyClOvDni.jpg' },
];

const getMonthInWords = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const MovieSelect = ({ selectedDate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTempDate, setShowTempDate] = useState(true); // Set to true initially

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to toggle the temporary date display
  const toggleTempDate = () => {
    setShowTempDate(!showTempDate);
  };

  return (
    <div>
      <div className="date-time">
        <h2 className="current-time">{currentTime.toLocaleTimeString()}</h2>
      </div>
      <div className="movie-grid">
        {moviesData.map((movie, index) => (
          <div key={movie.id} className="movie-item">
            <div className="cinema-data">{cinemasData[index].name}</div>
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-info">
              <h2>{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
      {/* Button to toggle the temporary date */}
      <button onClick={toggleTempDate}>Toggle Temp Date</button>
      {/* Conditionally render the temporary date */}
      {showTempDate && (
        <div className="date">
          <h1>{getMonthInWords(selectedDate)}</h1>
        </div>
      )}
    </div>
  );
};

export default MovieSelect;
