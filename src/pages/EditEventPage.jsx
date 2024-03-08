/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import eventsService from "../services/events.service"

function EditEvent() {

    const [title, setTitle] = useState("");
    const [eventType, setEventType] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [isEighteen, setIsEighteen] = useState(false);

    const navigate = useNavigate();

    const { eventId } = useParams();

    useEffect(() => {
        eventsService.getEvent(eventId)
            .then((response)    => {
                const oneEvent = response.data;
                setTitle(oneEvent.title);
                setEventType(oneEvent.eventType);
                setDescription(oneEvent.description);
                setTime(oneEvent.time);
                setIsEighteen(oneEvent.isEighteen);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [eventId]) 

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            title,
            eventType,
            description,
            time,
            isEighteen
        };
        eventsService
            .updateEvent(eventId, requestBody)
            .then((response) => {
                navigate(`/events/${eventId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="edit-event">
            <h1>Edit Event</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />

                <label>Event type::</label>
                <select
                    name="eventType"
                    value={eventType}
                    onChange={(event) => setEventType(event.target.value)}
                    required
                >
                    <option value="Concert">Concert</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Market">Market</option>
                    <option value="Party">Party</option>
                    <option value="Theatre">Theatre</option>
                    <option value="Other">Other</option>
                </select>

                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />

                <label>Time:</label>
                <input
                    type="date"
                    name="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    
                />

                <label>Is eighteen:</label>
                <input
                    type="checkbox"
                    name="isEighteen"
                    value={isEighteen}
                    onChange={(event) => setIsEighteen(event.target.checked)}
                />
                <button onClick={handleFormSubmit}>Save Changes</button>
                <button onClick={() => navigate(`/venues/${eventId}`)}>Cancel</button>
              




            </form>

        </div>
    );

}

export default EditEvent;