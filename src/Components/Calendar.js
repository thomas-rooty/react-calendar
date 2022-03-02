import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {getEvents, deleteEvent, addEvent} from '../services/EventsManagement';
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";


const Calendar = () => {
    const [events, setEvents] = React.useState([]);
    React.useEffect(() => {
        // Get all event and wait for response, then set events
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

    // Delete an event from the calendar
    const handleEventClick = (arg) => {
        // Ask for confirmation
        if (window.confirm("Are you sure you want to delete this event ?")) {
            deleteEvent(arg.event.id).then(res => {
                setEvents(prevEvents => prevEvents.filter(event => event.id !== arg.event.id))
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const start = event.target.elements.start.value;
        const end = event.target.elements.end.value;
        addEvent(title, start, end).then(res => {
            setEvents(prevEvents => [...prevEvents, {
                title: title,
                start: start,
                end: end
            }])
        })
    }

    // Create an event on the calendar
    const handleDateClick = (arg) => {
        // Open the modal
        document.getElementById("modal").style.display = "block";
    }

    const closeModal = () => {
        document.getElementById("modal").style.display = "none";
    }

    return (
        <div className="calendarContainer">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
            />
            <div id="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal} >&times;</span>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title"/>
                        </label><br/>
                        <label>
                            Start:
                            <input type="datetime-local" name="start"/>
                        </label><br/>
                        <label>
                            End:
                            <input type="datetime-local" name="end"/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Calendar;