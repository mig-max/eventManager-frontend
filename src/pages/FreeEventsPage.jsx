import { useState, useEffect } from 'react';
import { Box, Heading, Center, Badge } from '@chakra-ui/react';
import eventsService from '../services/events.service';
import FreeEventsCarousel from '../components/FreeEventsCarousel';

const FreeEventsPage = () => {
    const [freeEvents, setFreeEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFreeEvents = async () => {
            try {
                const response = await eventsService.getAllEvents();
                const filteredEvents = response.data.filter(event => event.isFree); // Filter free events
                setFreeEvents(filteredEvents); // Update state with free events
            } catch (error) {
                console.error('Error fetching free events:', error);
                setError('Error fetching free events. Please try again later.');
            }
        };

        fetchFreeEvents();
    }, []);

    return (
        <Center>
            <Box w="90%" mt={8} px={{ base: 2, md: 4 }}>
                <Badge colorScheme="purple" mb={4}>
                    <Heading as="h2" size="lg">
                        Free Events
                    </Heading>
                </Badge>
                <Box>
                    {error && <p>Error: {error}</p>}
                    <FreeEventsCarousel freeEvents={freeEvents} />
                </Box>
            </Box>
        </Center>
    );
};

export default FreeEventsPage;
