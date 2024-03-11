import { useState, useEffect } from "react";
import { Box, Heading, Center} from "@chakra-ui/react";
import eventsService from "../services/events.service";
import EventsCarousel from "../components/EventsCarousel"; 

function EventListPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventsService.getAllEvents();
                console.log("Response Object:", response); 
                setEvents(response.data);
            } catch (error) {
                console.log("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="display-container">
        <Center>
            <Box w="90%" mt={8} px={{ base: 2, md: 4 }}>
                <Heading as='h1' size='4xl' noOfLines={1}>
                    Events
                </Heading>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <EventsCarousel events={events} /> 
                )}
            </Box>
        </Center>
        </div>
    );
}

export default EventListPage;
