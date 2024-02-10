
import './App.css';
import Calendar from './components/Calendar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './pages/MovieList';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
  <div>
  <Router>
    <Routes>
    {/* <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/> */}
    {/* <Route path="movies" element={<ProtectedRoute><MovieList/></ProtectedRoute>}/> */}
      <Route exact path='/' Component={Calendar} />
      {/* <Route path='/movies' Component={MovieList} />
      <Route path='/movies/:id' Component={MovieChosen} /> */}
    </Routes>
  </Router>
  
  </div>
  );
  }
export default App;
