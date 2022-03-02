import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {getEvents, deleteEvent} from '../services/EventsManagement';
import interactionPlugin from "@fullcalendar/interaction";


const Calendar = () => {
    // Fetch events from eventsManagement
    const [events, setEvents] = React.useState([]);
    React.useEffect(() => {
        getEvents().then(res => {
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
        // Ask for confirmation
        if (window.confirm("Are you sure you want to delete this event?")) {
            deleteEvent(eventId).then(res => {
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId))
            })
        }
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