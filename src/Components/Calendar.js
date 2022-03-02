import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {getEvents, deleteEvent, addEvent, getEventDetails} from '../services/EventsManagement';
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import DetailsModal from "./DetailsModal";


const Calendar = () => {
    const [events, setEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    React.useEffect(() => {
        // Get all event and wait for response, then set events
        getEvents().then(res => {
            res.forEach(todo => {
                setEvents(prevEvents => [...prevEvents, {
                    title: todo.title,
                    content: todo.content,
                    start: todo.start,
                    end: todo.end,
                    id: todo._id
                }])
            })
        })
    }, []);

    // Show event details
    const handleEventClick = (arg) => {
        getEventDetails(arg.event.id).then(res => {
            setSelectedEvent(res);
            document.getElementById("modal").style.display = "block";
        })
    }

    // Create an event on the calendar
    const handleAddEvent = (arg) => {
        // Open the modal
        document.getElementById("addEventModal").style.display = "block";
    }

    // Submit the event to the api and close the modal
    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        const start = event.target.elements.start.value;
        const end = event.target.elements.end.value;
        addEvent(title, content, start, end).then(res => {
            setEvents(prevEvents => [...prevEvents, {
                title: title,
                content: content,
                start: start,
                end: end
            }])
        })
        closeModal();
    }

    const closeModal = () => {
        document.getElementById("addEventModal").style.display = "none";
    }

    const onClose = () => {
        document.getElementById("modal").style.display = "none";
    }

    return (
        <div className="calendarContainer">
            <button className="addEventButton" onClick={handleAddEvent}>Add an event</button>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
            />
            {selectedEvent && <DetailsModal event={selectedEvent} onClose={onClose}/>}
            <div id="addEventModal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal} >&times;</span>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title"/>
                        </label><br/>
                        <label>
                            Content:
                            <input type="text" name="content"/>
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