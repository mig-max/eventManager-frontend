import { useState, useEffect } from "react";
import { Box, Heading, Center, Badge } from "@chakra-ui/react";
import eventsService from "../services/events.service";
import EventsCarousel from "../components/EventsCarousel"; // Import the EventsCarousel component

function EventListPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventsService.getAllEvents();
                console.log("Response Object:", response); // Log the entire response object for debugging
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <Center>
            <Box w="90%" mt={8} px={{ base: 2, md: 4 }}>
                <Badge colorScheme="purple" mb={4}>
                    <Heading as="h1" size="lg">
                        Events
                    </Heading>
                </Badge>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <EventsCarousel events={events} /> 
                )}
            </Box>
        </Center>
    );
}

export default EventListPage;
