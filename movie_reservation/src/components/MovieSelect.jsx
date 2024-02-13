import React, { Component } from 'react';
import '../stylesheets/MovieSelect.css';
import axios from 'axios'

const cinemasData = [
  { id: 1, name: 'Cinema 1' },
  { id: 2, name: 'Cinema 2' },
  { id: 3, name: 'Cinema 3' },
  { id: 4, name: 'Cinema 4' },
];

const getMonthInWords = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

class MovieSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
      showTempDate: true
    };
  }

  

  componentDidMount() {
    axios.get('http://localhost:5000/movies')
      .then((response) => this.setState({ movies: response.data }))
      .catch((err) => console.log(err));

    this.interval = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleTempDate = () => {
    this.setState((prevState) => ({ showTempDate: !prevState.showTempDate }));
  };

  handleMovieClick = (movieId) => {
    this.props.onNextScreen(movieId);
  };

  render() {
    const { selectedDate } = this.props;
    const { currentTime, showTempDate, movies } = this.state;
    console.log('Movies:', movies); // Log movies to console
    return (
      <div>
        <div className="date-time">
          <h2 className="current-time">{currentTime.toLocaleTimeString()}</h2>
        </div>
        <div className="movie-grid">
          {movies && movies.map((movie, index) => (
            <div key={movie.id} className="movie-item">
              {/* <div className="cinema-data">{cinemasData[index].name}</div> */}
              <img src={movie.poster} alt={movie.title} onClick={() => this.handleMovieClick(movie._id)} />
              <div className="movie-info">
                <h2>{movie.title}</h2>
              </div>
            </div>
          ))}
        </div>
        {/* <button onClick={this.toggleTempDate}>Toggle Temp Date</button> */}
        {/* {showTempDate && ( */}
          <div className="date">
            {/* <h1>{getMonthInWords(selectedDate)}</h1> */}
            <h1>{selectedDate}</h1>
            { console.log(selectedDate)}
          </div>
        {/* )} */}
      </div>
    );
  }
}

export default MovieSelect;