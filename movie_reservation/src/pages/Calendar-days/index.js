import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function CalendarDays(props) {
  const navigate = useNavigate();
  const [airingTimes, setAiringTimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/airing-time");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAiringTimes(data.airingTimes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const latestEndTime =
    airingTimes.length > 0
      ? new Date(airingTimes[airingTimes.length - 2].startTime)
      : new Date();
  console.log(latestEndTime);

  const dayClick = (day) => {
    if (day.date < new Date().setHours(0, 0, 0, 0)) {
      console.log(day.date);
      console.log(new Date());
    } else {
      if (day.date < latestEndTime) {
        props.changeCurrentDay(day.date);
        console.log(day.date);
        navigate("/gi", { state: { selectedDay: day } });
      }
    }
  };

  let firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }
    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };
    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day, index) => {
        const dayClasses =
          "calendar-day" +
          (day.currentMonth
            ? day.date < new Date().setHours(0, 0, 0, 0) ||
              day.date >= latestEndTime
              ? " not"
              : " current"
            : "") +
          (day.selected ? " selected" : "");
        return (
          <div key={index} className={dayClasses} onClick={() => dayClick(day)}>
            <p>{day.number}</p>
          </div>
        );
      })}
    </div>
  );
}
