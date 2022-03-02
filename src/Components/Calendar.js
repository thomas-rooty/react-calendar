import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {eventsManagement} from '../services/EventsManagement';
import interactionPlugin from "@fullcalendar/interaction";


const Calendar = () => {
    // Fetch events from eventsManagement
    const [events, setEvents] = React.useState([]);
    React.useEffect(() => {
        eventsManagement().then(res => {
            res.forEach(todo => {
                setEvents(prevEvents => [...prevEvents, {
                    title: todo.title,
                    start: todo.start,
                    end: todo.end,
                    id: todo._id
                }])
            })
        })
    }, []);

    const handleEventClick = (arg) => {
        let eventId = arg.event.id;
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
        />
    )
}

export default Calendar;