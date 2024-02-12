import MovieSelected from '../../components/MovieSelected';
import ProtectedRoute from '../../components/ProtectedRoute';
import Home from '../Home';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function CalendarDays(props) {
    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }
    
        let calendarDay = {
          currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
          date: (new Date(firstDayOfMonth)),
          month: firstDayOfMonth.getMonth(),
          number: firstDayOfMonth.getDate(),
          selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
          year: firstDayOfMonth.getFullYear()
        }
    
        currentDays.push(calendarDay);
    }
  
    return (
        <div className="table-content">
        {
          currentDays.map((day, index) => {
            return (
              <div key={index} className={"calendar-day" + (day.currentMonth ? " current" : " not") + (day.selected ? " selected" : "")}
                    onClick={() => { 
                      props.changeCurrentDay(day) 
                      {console.log(day)} 
                      } 
                    }
              > 
                    {/* add the route */}
                       {/* <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/> */}
                       {/* <Route path="/Niles" element={<ProtectedRoute><MovieSelected/></ProtectedRoute>}/> */}
                <p>{day.number}</p>
              </div>
            )
          })
        }
      </div>
    )
  }





