
import './App.css';
import Calendar from './components/Calendar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieList from './pages/MovieList';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path='/'element={<Home/>} />
//           <Route path='movies' elemet={<MovieList/>} />
//         </Routes>
//       </BrowserRouter>

//       <main><Calendar/></main>
//     </div>
//   );
// }
function App() {
  return (
  <div>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
  <Route path="movies" element={<ProtectedRoute><MovieList/></ProtectedRoute>}/>
  </Routes>
  </BrowserRouter>
  </div>
  );
  }
export default App;
