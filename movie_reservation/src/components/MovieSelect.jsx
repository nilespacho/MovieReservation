import React from 'react'
import '../stylesheets/MovieSelect.css';

const moviesData = [
  { id: 1, title: 'The Shawshank Redemption',  poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
  { id: 2, title: 'The Godfather', poster: 'https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg' },
  { id: 3, title: 'The Dark Knight', poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg' },
  { id: 4, title: 'Alita',  poster: 'https://image.tmdb.org/t/p/w500/xRWht48C2V8XNfzvPehyClOvDni.jpg'},
];

const MovieSelect = () => {
  return (
    <div>
      <h1>Cinema 1</h1>
      <div className="movie-grid">
        {moviesData.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-info">
              <h2>{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSelect;


