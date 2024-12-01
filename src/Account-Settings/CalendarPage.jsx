import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default styles
import './calendarStyle.css'; // Create a CSS file for your styles

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
        // You can handle additional actions here, such as fetching events for the selected date
    };

    return (
        <div className="calendar-container">
            <h1>My Calendar</h1>
            <Calendar 
                onChange={handleDateChange}
                value={date}
                className="custom-calendar" // Add custom class for additional styling
            />
            <div className="selected-date">
                <h2>Selected Date:</h2>
                <p>{date.toDateString()}</p>
            </div>
            <div className="events">
                {/* You can dynamically display events based on the selected date here */}
                <h2>Events</h2>
                <ul>
                    {/* Sample dynamic events - replace with actual data */}
                    <li>Event 1 on {date.toDateString()}</li>
                    <li>Event 2 on {date.toDateString()}</li>
                </ul>
            </div>
        </div>
    );
};

export default CalendarPage;
