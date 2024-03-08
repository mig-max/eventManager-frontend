import { useState } from "react";
import eventsService from "../services/events.service";
//import moment from 'moment';

function AddEvent(props) {
    const [title, setTitle] = useState("");
    const [eventType, setEventType] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [isEighteen, setIsEighteen] = useState(false);
    //const [venue, setVenue] = useState("");

    
    const handleSubmit = (e) => {
        e.preventDefault();
        //const selectedDate = new Date(e.target.elements.time.value);
        const requestBody = {
            title,
            eventType: [eventType],
            description,
            time,
            isEighteen
        };
    

    eventsService.createEvent(requestBody)
        .then((response) => {
            setTitle("");
            setEventType("Concert");
            setDescription("");
            setTime("");
            setIsEighteen(false);

            props.refreshEvents();
        })
        .catch((error) => console.log(error));
    };



    return (
        <div className="AddEvent">
            <h3>Add Event</h3>

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Event type::</label>
                <select
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Time:</label>
                <input
                    type="date"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    
                />

                <label>Is eighteen:</label>
                <input
                    type="checkbox"
                    name="isEighteen"
                    value={isEighteen}
                    onChange={(e) => setIsEighteen(e.target.checked)}
                />
                <button type="submit">Submit</button>
            </form>

        </div>
    );

}

export default AddEvent;