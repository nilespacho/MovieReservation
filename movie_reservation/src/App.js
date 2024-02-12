
import './App.css';
import Calendar from './components/Calendar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './pages/MovieList';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import MovieSelect from './components/MovieSelect';
import MovieSelected from './components/MovieSelected';

function App() {
    return (
    <div>
      <Router>
        {/* <Routes> */}
          {/* <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/> */}
          {/* <Route path="movies" element={<ProtectedRoute><MovieList/></ProtectedRoute>}/> */}
        {/* </Routes> */}

        <Routes>
          <Route exact path="/" element={<Calendar/>}/>
          <Route path = "/niles" element={<MovieSelected/>} />
        </Routes>

      </Router>
      
      {/* <main className='Calendar'><MovieSelected/></main> */}
    </div>
    );

  // Niles Commit
  // <main className='Calendar'><MovieSelected/></main>

  }
export default App;
