import './App.css';
import React, { useState } from 'react';
import Calendar from './components/Calendar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './pages/MovieList';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import MovieSelect from './components/MovieSelect';
import MovieSelected from './components/MovieSelected';
import ReservationList from './components/ReservationList';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Calendar />} />
          <Route path="/MovieSelected/:movieId" element={<MovieSelected selectedDate={selectedDate} />} />
          <Route path="/Movies" element={<MovieSelect selectedDate={selectedDate} onSelectedDate={handleSelectedDate} />} />
          <Route path='/Reservations' element={<ReservationList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
