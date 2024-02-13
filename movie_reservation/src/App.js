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
<<<<<<< HEAD
  <div>
  <BrowserRouter>
  <Routes>
  {/* <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/> */}
  {/* <Route path="movies" element={<ProtectedRoute><MovieList/></ProtectedRoute>}/> */}
  </Routes>
  </BrowserRouter>
  {/* <main className='ReservationList'><MovieSelected/></main> */}
  <main className='ReservationList'><ReservationList/></main>
  </div>
=======
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Calendar />} />
          <Route path="/niles/:movieId" element={<MovieSelected selectedDate={selectedDate} />} />
          <Route path="/gi" element={<MovieSelect selectedDate={selectedDate} onSelectedDate={handleSelectedDate} />} />
        </Routes>
      </Router>
    </div>
>>>>>>> main
  );
}

export default App;
