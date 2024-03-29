import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CalendarDays from "../pages/Calendar-days/index";
import "../stylesheets/Calendar.css";

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.state = {
      currentDay: new Date(),
    };
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  };

  render() {
    return (
      <main className="Calendar">
        <div className="calendar">
          <div className="calendar-header">
            <h2>
              {this.months[this.state.currentDay.getMonth()]}{" "}
              {this.state.currentDay.getFullYear()}
            </h2>
          </div>
          <div className="calendar-body">
            <div className="table-header">
              {this.weekdays.map((weekday, index) => {
                return (
                  <div key={index} className="weekday">
                    <p>{weekday}</p>
                  </div>
                );
              })}
            </div>
            <Link to="/Reservations">
              <button className="reservation-list-button">
                Reservation List
              </button>
            </Link>
            <CalendarDays
              day={this.state.currentDay}
              changeCurrentDay={this.changeCurrentDay}
            />
          </div>
        </div>
      </main>
    );
  }
}
