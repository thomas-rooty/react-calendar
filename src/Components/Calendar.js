import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {getTodos} from '../services/getTodos';

const Calendar = () => {
    // Fetch events from getTodos
    const [events, setEvents] = React.useState([]);
    React.useEffect(() => {
        getTodos().then(res => {
            setEvents(res);
        })
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
        />
    )
}

export default Calendar;